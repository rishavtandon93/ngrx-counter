onQuoteGridCellKeyDown = (cellDownEvent: CellKeyDownEvent): void => {
  const keyboardEvent = cellDownEvent.event as KeyboardEvent;

  if (keyboardEvent.key === 'Delete' || keyboardEvent.key === 'Del') {
    const selectedNodes = cellDownEvent.api.getSelectedNodes();
    const lastRowIndex = cellDownEvent.api.getDisplayedRowCount() - 1;

    // Collect all rows to be deleted
    const rowsToRemove = selectedNodes.map((node) => node.data);

    // Check if any selected node is the last row
    const isLastRowSelected = selectedNodes.some(
      (node) => node.rowIndex === lastRowIndex
    );

    // If last row is not selected, remove the rows
    if (!isLastRowSelected) {
      cellDownEvent.api.applyTransaction({ remove: rowsToRemove });
    }

    // Clear selection to avoid issues after deleting rows
    cellDownEvent.api.deselectAll();
  }
};
