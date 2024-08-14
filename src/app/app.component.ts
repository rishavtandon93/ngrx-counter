getFeedbackBlotterSchema(): Observable<BlotterColumnDef[]> {
  return this.api.getFeedbackBlotterSchema().pipe(
    map((columnDefs: BlotterColumnDef[]) =>
      columnDefs.map(column =>
        column.type === 'Datetime'
          ? {
              ...column,
              valueFormatter: (params) => dateUtils.getformattedTimeZoneFromstring(params.value),
              cellRenderer: DateTimeCellRendererComponent
            }
          : column
      )
    ),
    tap((columnDefs) =>
      this.blotterService.messageBuilderSpecs$.next(blotterMappers.mapToMessageBuilderSpecs(columnDefs))
    )
  );
}



const siteMaxIdMap = new Map<string, number>();

  this.rowData.forEach(curr => {
    const maxId = siteMaxIdMap.get(curr.site);
    if (maxId === undefined || curr.id > maxId) {
      siteMaxIdMap.set(curr.site, curr.id);
    }
  });

  // Convert the Map to an array of filter criteria
  const latestData = Array.from(siteMaxIdMap.entries()).map(([site, id]) => ({ site, id }));

