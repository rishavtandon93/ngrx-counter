export interface BlotterMetaData {
  totalCount: number;
  details: Detail[];
}

export interface Detail {
  submissionDate: string;
  count: number;
}
