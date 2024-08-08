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


setDateFromString(inputString: string) {
  const dateRegex = /\b(\d{4})-(\d{2})-(\d{2})\b/;
  const match = inputString.match(dateRegex);

  this.form.get('date')?.setValue(match ? DateTime.fromISO(match[0]).toJSDate() : null);
}
