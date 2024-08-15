import { takeUntil } from "rxjs";

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



  setBootstrapGridDataFilter(): void {
    this.bootstrapService.getSelectedDataFilter()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((filter: BootstrapDataFilter) => {
        if (filter === BootstrapDataFilter.ALL) {
          const siteMaxIdMap = new Map<string, number>();

          // Collect the maximum id per site
          this.gridApi.forEachNodeAfterFilter((node) => {
            if (node.key === null && node.data) {
              const { site, id } = node.data;
              const maxId = siteMaxIdMap.get(site) || 0;
              if (id > maxId) {
                siteMaxIdMap.set(site, id);
              }
            }
          });

          // Prepare and apply filter model in one step
          const filterModel: ISimpleFilterModel = {
            id: {
              filterType: 'set',
              values: Array.from(siteMaxIdMap.values()).map(String)
            },
            site: {
              filterType: 'set',
              values: Array.from(siteMaxIdMap.keys())
            }
          };

          this.gridApi.setFilterModel(filterModel);
          this.gridApi.onFilterChanged();
        }
      });
  }
