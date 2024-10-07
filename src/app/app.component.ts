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
    const rowToDelete = params.node.data;

    // Delete the row
    params.api.applyTransaction({ remove: [rowToDelete] });
  }
}
