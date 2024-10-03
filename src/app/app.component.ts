<div class="container">
  <!-- First horizontal div (split into three vertically) -->
  <div class="left-section">
    <div class="red-box">Red</div>
    <div class="green-box">Green</div>
    <div class="blue-box">Blue</div>
  </div>

  <!-- Second horizontal div -->
  <div class="right-section">
    <div class="white-box">White</div>
  </div>
</div>


.container {
  display: flex;
  height: 100vh; /* Full height of the viewport */
}

/* Left Section: Split vertically into 3 */
.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.red-box, .green-box, .blue-box {
  flex-grow: 1;
}

.red-box, .green-box {
  flex-basis: 40%;
}

.blue-box {
  flex-basis: 20%;
}

.red-box {
  background-color: red;
}

.green-box {
  background-color: green;
}

.blue-box {
  background-color: blue;
}

/* Right Section */
.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
