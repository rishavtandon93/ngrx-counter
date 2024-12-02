this.attributionService.calculateAttribution().subscribe((data: unknown) => {
  // Use Object.entries to dynamically process each key in AttributionResult
  const transactions = Object.entries(AttributionResult)
    .map(([key, value]) => {
      const row = data?.[value]?.['Rows']?.[0];
      return row ? { ...row, type: value } : null; // Add type if row exists
    })
    .filter(Boolean); // Filter out null values

  // Apply all transactions in a single call
  this.gridApi.applyTransaction({ add: transactions });
});
