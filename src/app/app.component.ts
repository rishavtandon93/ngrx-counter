function findHighestValue(arr) {
  return arr.reduce((max, obj) => {
    return obj.value !== null && obj.value > max ? obj.value : max;
  }, 0);
}
