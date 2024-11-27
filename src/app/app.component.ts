const order = ['type', 'Quote_Id', 'Product_Description'];

const reorderedColumns = [
  ...columns.filter((col) => order.includes(col.field)), // Top-priority fields
  ...columns.filter((col) => !order.includes(col.field)), // Remaining fields
];
