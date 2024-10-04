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
