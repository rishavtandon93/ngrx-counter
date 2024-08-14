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



showLatest() {
  // Create an object to store the filter model for 'id' and 'site'
  const filterModel: IFilterModel = {};

  // Group data by site and find the largest id for each site
  const latestData = this.rowData.reduce((acc, curr) => {
    const existing = acc.find(item => item.site === curr.site);
    if (!existing || curr.id > existing.id) {
      if (existing) {
        acc = acc.filter(item => item.site !== curr.site); // Remove previous entry for the site
      }
      acc.push({ site: curr.site, id: curr.id });
    }
    return acc;
  }, []);

  // Apply a set filter on 'id' and 'site' using the largest IDs and corresponding sites
  filterModel['id'] = {
    filterType: 'set',
    values: latestData.map(item => item.id.toString()) // Convert ids to strings as required by the filter model
  };

  filterModel['site'] = {
    filterType: 'set',
    values: latestData.map(item => item.site)
  };

  // Apply the filter model to the grid
  this.gridApi.setFilterModel(filterModel);
  this.gridApi.onFilterChanged();
}

