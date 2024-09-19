processIds() {
  const inputString = this.idsControl.value;

  // Split input string based on commas, spaces, or newlines
  const idArray = inputString
    .split(/[\s,]+/) // Regular expression to split by spaces, commas, or newlines
    .filter(id => id.trim() !== ''); // Filter out empty strings

  console.log(idArray);
  // You can now use this array for further processing
}
