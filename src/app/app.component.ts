<div class="vertical-div">
  <button class="vertical-button">Grid</button>
</div>

.vertical-div {
  width: 30px;
  height: 100vh; /* 100% of the viewport height */
  position: fixed;
  left: 0;
  top: 0;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Styling for the vertical button */
.vertical-button {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  background-color: #555;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.vertical-button:hover {
  background-color: #777;
}
