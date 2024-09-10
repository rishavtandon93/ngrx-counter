


<p-sidebar [(visible)]="visibleSidebar" [fullScreen]="false" [baseZIndex]="10000" [style]="{'width':'300px'}" position="left" [blockScroll]="true">
    <h1>Sidebar Content</h1>
    <p>Place your content here.</p>
</p-sidebar>

<!-- Main content of the page -->
<div class="main-content" [class.collapsed]="!visibleSidebar">
    <h1>Main Content Area</h1>
    <button (click)="toggleSidebar()">Toggle Sidebar</button>
    <p>This is the main page content.</p>
</div>


/* Full-height sidebar styling */
p-sidebar {
  height: 100vh; /* Full page height */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Main content */
.main-content {
  margin-left: 0;
  padding: 20px;
  transition: all 0.3s ease;
}

.main-content.collapsed {
  margin-left: 300px; /* Adjust based on sidebar width */
}

/* Sidebar when collapsed */
p-sidebar.collapsed {
  width: 60px; /* Adjust width when collapsed */
}
