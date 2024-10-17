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
