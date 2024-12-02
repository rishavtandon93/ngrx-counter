onQuoteGridCellKeyDown = (cellDownEvent: CellKeyDownEvent): void => {
  const keyboardEvent = cellDownEvent.event as KeyboardEvent;

  if (keyboardEvent.key === 'Delete' || keyboardEvent.key === 'Del') {
    const api = cellDownEvent.api;

    // Get all selected cells
    const selectedCells = api.getCellRanges();
    let rowsToRemove = new Set();

    if (selectedCells && selectedCells.length > 0) {
      // Collect all rows from selected cell ranges
      selectedCells.forEach((range) => {
        for (
          let rowIndex = range.startRow.rowIndex;
          rowIndex <= range.endRow.rowIndex;
          rowIndex++
        ) {
          const node = api.getDisplayedRowAtIndex(rowIndex);
          if (node && node.data) {
            rowsToRemove.add(node.data);
          }
        }
      });
    } else {
      // If no range is selected, remove the row of the current cell
      const currentNode = cellDownEvent.node;
      if (currentNode && currentNode.data) {
        rowsToRemove.add(currentNode.data);
      }
    }

    // Convert Set to Array and remove rows
    rowsToRemove = Array.from(rowsToRemove);
    if (rowsToRemove.length > 0) {
      api.applyTransaction({ remove: rowsToRemove });
    }
  }
};
