function transformAttribution(): Observable<any> {
  return calculateAttribution().pipe(
    map((data) => {
      if (data.Result && data.Result.Rows.length > 0) {
        const firstRow = data.Result.Rows[0];
        return Object.keys(firstRow).map((key) => ({
          field: key,
          headerName: key,
        }));
      }
      return []; // Return an empty array if Result or Rows is not present
    })
  );
}
