import { ReactElement } from "react";

interface IColumns {
  title: string;
  field: string;
  render?: (rowData) => ReactElement;
}

export interface IMaterialTableProps{
  columns: IColumns[];
  data: [{}];
  title: string;
}