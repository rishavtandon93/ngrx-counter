<div class="container">
  <!-- First Section (Horizontally split into three divs) -->
  <div class="top-section">
    <div class="box red">Div 1 (40%)</div>
    <div class="box green">Div 2 (40%)</div>
    <div class="box blue">Div 3 (20%)</div>
  </div>

  <!-- Second Section (Bottom Div) -->
  <div class="bottom-section white">
    Bottom Div (100%)
  </div>
</div>


/* Container for the whole page */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */
}

/* Top section with horizontal flex distribution */
.top-section {
  display: flex;
  flex: 1; /* Occupies the available space */
}

/* Bottom section with white background */
.bottom-section {
  background-color: white;
  flex: 1; /* Bottom section takes remaining space */
}

/* Individual boxes in the top section */
.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
}

/* Flex properties for the first two boxes */
.red {
  background-color: red;
  flex: 0 0 40%; /* Takes 40% of the available space */
}

.green {
  background-color: green;
  flex: 0 0 40%; /* Takes 40% of the available space */
}

/* Flex property for the third box */
.blue {
  background-color: blue;
  flex: 0 0 20%; /* Takes 20% of the available space */
}
