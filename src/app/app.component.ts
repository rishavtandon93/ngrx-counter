import { Component } from '@angular/core';
import {
  ColDef,
  GridOptions,
  GridReadyEvent,
  ClipboardPasteEndEvent,
  ProcessCellForExportParams,
  ProcessCellForImportParams,
} from 'ag-grid-community';

interface RowData {
  id: string;
  solution: string | null;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  public columnDefs: ColDef[]; // Strict typing for column definitions
  public rowData: RowData[]; // Strict typing for row data
  public defaultColDef: ColDef; // Strict typing for default column definition
  public gridOptions: GridOptions; // Strict typing for grid options

  constructor() {
    // Define the column structure with proper typing
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
      },
      { headerName: 'Solution', field: 'solution', editable: true },
    ];

    // Default row data with strict typing
    this.rowData = [{ id: '', solution: null }];

    // Default column configuration
    this.defaultColDef = {
      flex: 1, // Adjust to fill space
      resizable: true, // Allow columns to be resized
      editable: true, // Make cells editable
    };

    // Define grid options with clipboard paste functionality
    this.gridOptions = {
      onPasteStart: this.onPasteStart.bind(this),
      onPasteEnd: this.onPasteEnd.bind(this),
      processCellForClipboard: this.processCellForClipboard.bind(this),
      processCellFromClipboard: this.processCellFromClipboard.bind(this),
    };
  }

  // Handle paste start event (with proper typing)
  onPasteStart(params: ClipboardPasteEndEvent): void {
    console.log('Paste operation started');
  }

  // Handle paste end event, parse the pasted data and create new rows (typed with ClipboardPasteEndEvent)
  onPasteEnd(params: ClipboardPasteEndEvent): void {
    const pastedText =
      params.api.getClipboardService()?.getDataFromClipboard() || '';

    // Split the pasted text by commas, spaces, or new lines
    const ids: string[] = pastedText
      .split(/[\s,]+/) // Split by space, comma, or new line
      .filter((id) => id.trim() !== ''); // Remove empty strings after trimming

    // Add a new row for each parsed ID
    ids.forEach((id) => {
      this.addRow(id);
    });
  }

  // Method to add a new row with strict typing
  addRow(newId: string): void {
    const newRow: RowData = { id: newId, solution: null };
    this.rowData = [...this.rowData, newRow];
  }

  // Process the value being copied to the clipboard (typed with ProcessCellForExportParams)
  processCellForClipboard(params: ProcessCellForExportParams): string | null {
    return params.value ? params.value.toString() : null;
  }

  // Process the value being pasted from the clipboard (typed with ProcessCellForImportParams)
  processCellFromClipboard(params: ProcessCellForImportParams): string | null {
    return params.value ? params.value.toString() : null;
  }

  // Grid ready event
  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }
}
