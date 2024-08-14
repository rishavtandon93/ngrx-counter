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
  const filterModel: IFilterModel = {};

  // Get the unique sites from the data
  const sites = [...new Set(this.rowData.map(item => item.site))];

  // For each site, find the largest id and create a filter model
  sites.forEach(site => {
    const maxId = Math.max(
      ...this.rowData.filter(item => item.site === site).map(item => item.id)
    );
    filterModel['id'] = {
      type: 'equals',
      filter: maxId,
      filterType: 'number'
    };
    filterModel['site'] = {
      type: 'equals',
      filter: site,
      filterType: 'text'
    };

    // Apply the filter model for each site
    this.gridApi.setFilterModel(filterModel);
  });

  this.gridApi.onFilterChanged();
}
