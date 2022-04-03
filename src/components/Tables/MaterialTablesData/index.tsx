import MaterialTable from '@material-table/core';
import { IMaterialTableProps } from './IMaterialTablesData';

export default function MaterialTablesData({columns, data, title}: IMaterialTableProps) {
  return(
    <div style={{ maxWidth: '100%' }}>
    <MaterialTable
      columns={columns}
      data={data}
      title={title}
    />
  </div>
  )
}