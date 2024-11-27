const desiredOrder = ['type', 'Quote_Id', 'Product_Description'];

const reorderedColDef = [
  ...desiredOrder.map((field) => colDef.find((col) => col.field === field)), // Add the desired fields in order
  ...colDef.filter((col) => !desiredOrder.includes(col.field)), // Add the remaining fields in original order
];
