onCellPaste(event: any) {
  const pastedData = event.clipboardData.getData('text');

  if (pastedData) {
    const values = pastedData.split(/[\s,]+/); // Split by space or comma
    const focusedCell = this.gridApi.getFocusedCell(); // Get the focused cell

    if (focusedCell && values.length > 0) {
      const columnField = focusedCell.column.getColDef().field; // Get the column (quoteId or solution)
      let rowIndex = focusedCell.rowIndex; // Starting row index

      for (let i = 0; i < values.length; i++) {
        // Check if a row already exists at this index
        let rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex + i);

        if (rowNode) {
          // Update existing row with the new value in the correct column
          rowNode.setDataValue(columnField, values[i]);
        } else {
          // If no row exists, create a new row
          const newRow = { quoteId: null, solution: null };
          newRow[columnField] = values[i]; // Add value to the correct column
          this.gridApi.applyTransaction({ add: [newRow] });
        }
      }
    }
  }
}


export interface InputObject {
  quoteId: string;
  solution: string | number;
}

export function extractValues(obj: InputObject): Array<string | number> {
  let result: Array<string | number> = [];

  // Check if quoteId is a string and contains space or comma-separated values
  if (typeof obj.quoteId === 'string' && (obj.quoteId.includes(' ') || obj.quoteId.includes(','))) {
    result = obj.quoteId.split(/[\s,]+/); // Split by space or comma
  }

  // Check if solution is a string or number and contains space or comma-separated values
  if (typeof obj.solution === 'string' || typeof obj.solution === 'number') {
    let solutionStr = String(obj.solution); // Convert solution to string if it is a number
    if (solutionStr.includes(' ') || solutionStr.includes(',')) {
      result = solutionStr.split(/[\s,]+/).map(Number); // Split by space or comma and convert to numbers
    }
  }

  return result;
}

// Example usage in Angular
const exampleObj: InputObject = { quoteId: 'abc def', solution: 2 };
const result = extractValues(exampleObj);
console.log(result);


export function extractValues(obj: { quoteId: string, competitorSolution: string }): Array<string | number> {
  // Regular expression checks for a comma or space followed by a non-whitespace character
  const hasSeparatorWithValues = /[,\s]+\S+/;

  // Function to split and filter out empty strings
  const splitAndFilter = (str: string) => str.split(/[\s,]+/).filter(Boolean);

  // Check if quoteId contains a comma or space followed by a non-whitespace character
  if (obj.quoteId && hasSeparatorWithValues.test(obj.quoteId)) {
    return splitAndFilter(obj.quoteId); // Split by space or comma, filter out empty strings
  }
  // Check if competitorSolution contains a comma or space followed by a non-whitespace character
  if (obj.competitorSolution && hasSeparatorWithValues.test(obj.competitorSolution)) {
    return splitAndFilter(obj.competitorSolution); // Split by space or comma, filter out empty strings
  }

  // Return empty array if neither contains meaningful comma or space-separated values
  return [];
}


onCellValueChanged(params: any) {
  const lastIndex = params.api.getDisplayedRowCount() - 1;
  const lastRowNode = params.api.getDisplayedRowAtIndex(lastIndex);

  // Check if the last row has values in both 'quoteID' and 'solution'
  const hasQuoteID = lastRowNode?.data?.quoteID;
  const hasSolution = lastRowNode?.data?.solution;

  if (hasQuoteID && hasSolution) {
    // Add a new blank row at the end
    params.api.applyTransaction({ add: [{}] });
  }
}

function onCellKeyPress(params: CellKeyPressEvent) {
  if (params.event.key === "Delete" || params.event.key === "Del") {
    const lastRowIndex = params.api.getDisplayedRowCount() - 1;
    const isLastRow = params.node.rowIndex === lastRowIndex;
    const rowData = params.node.data;

    const isRowEmpty =
      rowData.quoteID === "" || rowData.quoteID == null &&
      rowData.solution === "" || rowData.solution == null;

    // Delete the row if it's not the last row, or if it's the last row and has data in at least one column
    if (!isLastRow || !isRowEmpty) {
      params.api.applyTransaction({ remove: [rowData] });
    }
  }
}

import { GridOptions, CellValueChangedEvent } from 'ag-grid-community';

let isButtonEnabled = false;

function onCellValueChanged(params: CellValueChangedEvent) {
  const allRowsHaveValues = checkAllCellsHaveValues(params.api);
  setButtonState(allRowsHaveValues);
}

function checkAllCellsHaveValues(api: GridOptions['api']): boolean {
  const rowCount = api!.getDisplayedRowCount();

  for (let i = 0; i < rowCount; i++) {
    const rowNode = api!.getDisplayedRowAtIndex(i);
    const rowData = rowNode?.data;

    // Check if either quoteId or competitorSolution is empty or null
    if (!rowData || rowData.quoteId == null || rowData.quoteId === "" ||
        rowData.competitorSolution == null || rowData.competitorSolution === "") {
      return false; // Return false immediately if any cell is empty or null
    }
  }

  return true; // All cells have values
}

function setButtonState(isEnabled: boolean) {
  const runButton = document.getElementById("runButton") as HTMLButtonElement;
  if (runButton) {
    runButton.disabled = !isEnabled;
    isButtonEnabled = isEnabled;
  }
}


Copy code
import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-my-grid',
  template: `<ag-grid-angular
                style="width: 100%; height: 500px;"
                class="ag-theme-alpine"
                [rowData]="rowData"
                [columnDefs]="columnDefs"
                [gridOptions]="gridOptions">
             </ag-grid-angular>`,
  styleUrls: ['./my-grid.component.css']
})
export class MyGridComponent {
  rowData = [
    { quoteId: '', competitorSolution: '' },
    { quoteId: '', competitorSolution: '' },
    // Add initial row data if needed
  ];

  columnDefs: ColDef[] = [
    {
      headerName: 'Quote ID',
      field: 'quoteId',
      editable: true,
      cellClassRules: {
        'error-cell': (params) => this.isDuplicateQuoteId(params),
      },
      onCellValueChanged: () => this.onQuoteIdChange(),
    },
    {
      headerName: 'Competitor Solution',
      field: 'competitorSolution',
      editable: true,
    },
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
  };

  isDuplicate(params) {
    const currentRowIndex = params.node.rowIndex;
    const quoteIdValue = params.value;

    // Loop through all rows above the current row and check for duplicate values
    for (let i = 0; i < currentRowIndex; i++) {
      const rowNode = params.api.getDisplayedRowAtIndex(i);
      if (rowNode && rowNode.data.quoteId === quoteIdValue) {
        return true;
      }
    }
    return false;
  }


  checkUniqueQuoteId(): boolean {
    const quoteIdSet = new Set<string>(); // Set to store unique quoteIds
    let isUnique = true;

    this.gridApi.forEachNode((node) => {
        const quoteId = node.data.quoteId; // Access quoteId value

        if (quoteIdSet.has(quoteId)) {
            // If quoteId already exists in the Set, we have a duplicate
            isUnique = false;
        } else {
            // Otherwise, add the quoteId to the Set
            quoteIdSet.add(quoteId);
        }
    });

    return isUnique; // Return true if all are unique, false if any duplicates
}

SIiplicity

Over the past year, I had a keen eye for simplifying processes and making them more efficient.

Actively contributed to several critical initiatives that were essential in automating workflows and optimizing operations. One of the standout features I actively contributed to was in the Comet Online application called Product Names, which enabled users to input product names for multiple languages based on their jurisdiction. This eliminated the need for later manual data entry, greatly reducing the associated workload.

My attention to detail and commitment to supporting the business helped me to develop an email generation feature for the Comet Desktop Sales Ideas Dashboard. Though a simple addition, it greatly benefited our trading and sales structuring teams by enabling more efficient monetization of ideas and quick generation of standardized email for our clients.

Building on this objective and the positive feedback from users, I continued to deliver impactful features, such as feedback reporting for Comet Quotes. This tool helped our sales team capture feedback accurately and reliably, providing valuable insights that allowed the business to make data-driven decisions, ultimately helping in driving more business for the team.

My goal is to maintain this approach, consistently delivering accurate and meaningful results.


business


Working on both the Comet Online and Comet Desktop platforms gave me a comprehensive understanding of what is truly important to the business. This broader perspective allowed me to deliver features that are not only critical but also provide significant value to the organization. By developing solutions like email generation for the Sales Ideas Dashboard and feedback capture for trades, I helped enhance the reputation of our product. These features contributed to smoother workflows and increased efficiency across teams, further solidifying the value of our platform.

I consistently aim to deliver features and products that are scalable across different regions within our business. I actively contributed to the development of high-quality solutions with a forward-thinking approach, ensuring that these features could be easily extended as the business evolves.

Drawing on my prior experience with the test automation team, I was able to establish a fast feedback loop with users, enabling quick issue resolution and improved user satisfaction. This proactive approach helped enhance the overall experience of our products, fostering greater trust and confidence in the solutions we provide.

Risk management and controls

Over the past year, while working on various features, I drew upon my experience across different components of the Comet stack to deliver solutions that carefully balanced innovation with risk management. I ensured that each feature was developed with a strong focus on potential risks and the broader impact it could have.

I proactively engaged with teams and users to ensure that all requirements were thoroughly understood and that appropriate controls were in place prior to each release. A key strategy I employed was collaborating with relevant stakeholders early on to discuss the potential impacts of new features, gathering their feedback to enhance the solution, and ensuring compliance with all regulations and business requirements.

Additionally, I worked closely with the automation team to rigorously test each feature. This approach helped ensure the delivery of accurate, reliable, and high-quality features while maintaining timely project completion.


Diversity


During my time with the current team, I’ve had the pleasure of working with colleagues from various regions and diverse backgrounds. This experience has broadened my perspective and enriched my understanding of both the business and the global nature of our work.

Having worked across different layers of the same project, including Comet Online, Comet Desktop, and briefly in test automation, I've gained a holistic view of our operations. This cross-functional exposure has not only deepened my technical knowledge but also enhanced my ability to deliver outcomes that align with the unique needs of each region.

These experiences have significantly shaped my approach to problem-solving, enabling me to provide more thoughtful and effective solutions that cater to our diverse global audience. I’ve also actively focused on improving the User Interface (UI) and User Experience (UX), identifying areas for enhancement both independently and in response to user feedback, ensuring our products continue to meet high standards of usability.

World class services

I always approach my work with the goal of delivering the best possible features and outcomes for our clients and users.

I’ve had the privilege of building features across multiple stacks, which has allowed me to design and implement solutions with a broader perspective, always keeping the team’s overall objectives in mind. Key features such as Product Names for Comet Online, Email Generation for the Sales Ideas Dashboard, and Feedback Capturing have significantly contributed to the business. This cross-stack exposure has enhanced my efficiency, enabling me to provide prompt and concise feedback on backend matters.

This proactive approach was recognized by both my colleagues and business users, and I received appreciation from my peers for consistently delivering high-quality services that benefit our clients.


Summary

The past year at Telmo has been highly productive, during which I successfully delivered several features across different stacks. This cross-stack exposure has deepened my understanding of the business and sharpened my approach to developing solutions that are critical to our success.

Notable features, such as the Email Generation for the Sales Ideas Dashboard and Feedback for the Quotes Page app, were recognized and appreciated by the business, and I was honored to receive recognition for my contributions.

I am excited to continue building on this momentum and look forward to delivering more impactful features, such as the upcoming Attribution Runner Page app, which will enhance the reliability and usability of Comet Desktop.


Precision Summary


Whenever I develop a feature, I make it a priority to carefully assess potential risks and ensure that controls are in place to mitigate them.

One of the key approaches I follow is establishing a feedback loop with stakeholders to fully understand the requirements and risks before moving forward with development. This collaborative approach ensures that we are aligned and can deliver features that meet business needs effectively.

I also design features with future scalability in mind, leaving room for extensions as the business evolves. Proactively communicating deployments and any application downtime to users has minimized disruption and enhanced the reliability of our system. Additionally, by promptly acting on feedback from key stakeholders and incorporating changes as quickly as possible, I’ve been able to deliver more accurate and impactful solutions.
