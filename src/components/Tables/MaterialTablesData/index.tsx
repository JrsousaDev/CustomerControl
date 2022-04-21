import MaterialTable from '@material-table/core';
import { IMaterialTableProps } from './IMaterialTablesData';

export default function MaterialTablesData({columns, data, title, actions, options}: IMaterialTableProps) {
  return(
    <div style={{ maxWidth: '100%' }}>
    <MaterialTable
      columns={columns}
      data={data}
      actions={actions}
      options={options}
      title={title}
      localization={{
        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'resultados',
        },
        header: {
          actions: 'Ações'
        },
        body: {
          emptyDataSourceMessage: 'Nenhum registro encontrado',
          filterRow: {
            filterTooltip: 'Filter'
          }
        },
        toolbar: {
          searchPlaceholder: 'Pesquisar',
          exportPDFName: 'Exportar em PDF',
          exportCSVName: 'Exportar em CSV',
          exportTitle: 'Exportar',
          nRowsSelected: '{0} row(s) selected',
        }
      }}
    />
  </div>
  )
}