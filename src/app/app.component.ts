const createTransaction = (key: keyof typeof AttributionResult) => {
  const row = data?.[key]?.['Rows']?.[0];
  if (row) {
    return { ...row, type: key };
  }
  return null;
};

const transactions = [
  createTransaction(AttributionResult.Result),
  createTransaction(AttributionResult.ResultRawPrice),
].filter(Boolean); // Filter out null values

transactions.forEach((transaction) => {
  this.gridApi.applyTransaction({ add: [transaction] });
});
