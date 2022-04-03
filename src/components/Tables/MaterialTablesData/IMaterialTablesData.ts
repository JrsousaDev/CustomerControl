interface IColumns {
  title: string;
  field: string;
}

export interface IMaterialTableProps{
  columns: IColumns[];
  data: [{}];
  title: string;
}