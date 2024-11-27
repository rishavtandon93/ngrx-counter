const order = ['type', 'Quote_Id', 'Product_Description'];

const reorderedColumns = [
  // First, sort and include the fields specified in the custom order
  ...order
    .map((field) => columns.find((col) => col.field === field))
    .filter(Boolean), // Remove any undefined values (if fields in `order` are not in `columns`)

  // Then, include all other fields that are not in the custom order
  ...columns.filter((col) => !order.includes(col.field)),
];

console.log(reorderedColumns);
