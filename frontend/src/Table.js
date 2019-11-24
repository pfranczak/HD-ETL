import React from 'react';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {Button} from "react-bootstrap";



const columns = [{
  dataField: 'city',
  text: 'Cities',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'company',
  text: 'Company Name',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'currency',
  text: 'Currency',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'date',
  text: 'Date',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'position',
  text: 'Position',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'salaryLow',
  text: 'Salary Low',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'salaryTop',
  text: 'Salary High',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'tags',
  text: 'Tags',
  sort: true,
  filter: textFilter()
},
];
function Table({ data }) {
  const transData = data.data.map(ele => ({...ele, city: ele.city.join(',\n'), tags: ele.tags.join(',\n')}));
  return (
    <ToolkitProvider
      keyField="id"
      data={ transData }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <Button onClick={() => props.csvProps.onExport()} variant="primary">Export CSV</Button>
            <BootstrapTable bootstrap4 {...props.baseProps} filter={ filterFactory() } filterPosition={'top'}/>
          </div>
        )
      }
    </ToolkitProvider>
  );
}

export default Table;
