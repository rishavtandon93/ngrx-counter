<div style="position: relative; min-height: 100vh;">
  <!-- Button to open the sidebar -->
  <button pButton type="button" icon="pi pi-table" (click)="showSidebar()" class="p-button-rounded p-button-outlined"
    style="position: absolute; top: 10px; left: 10px;"></button>

  <!-- Sidebar Component -->
  <p-sidebar [(visible)]="visibleSidebar" [baseZIndex]="10000" position="left" styleClass="custom-sidebar">
    <h3>Columns</h3>
    <ul>
      <li *ngFor="let item of columnItems">{{ item }}</li>
    </ul>
  </p-sidebar>
</div>

visibleSidebar: boolean = false;

  columnItems = ['Athlete', 'Age', 'Country', 'Year', 'Date', 'Gold', 'Silver', 'Bronze', 'Total'];

  showSidebar() {
    this.visibleSidebar = true;
  }


  .custom-sidebar {
    width: 300px !important;
    background-color: #2C3E50; /* Adjust the color based on the image */
    color: #ecf0f1;
  }

  .custom-sidebar h3 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ecf0f1;
  }

  .custom-sidebar ul {
    list-style: none;
    padding: 0;
  }

  .custom-sidebar ul li {
    padding: 10px;
    border-bottom: 1px solid #34495e;
    cursor: pointer;
  }

  .custom-sidebar ul li:hover {
    background-color: #34495e;
  }
