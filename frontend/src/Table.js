import React from 'react';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {Button} from "react-bootstrap";



function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


const jsonToCsv = (items) => {
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
  
  return csv
}

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
{
  dataField: 'export',
  text: 'Export',
  events: {
    onClick: (e, column, columnIndex, row, rowIndex) => {
      download('offer.csv', jsonToCsv([row]))
    },
  },
  attrs: {
    class: 'export-cell',
  },
  formatter: () => <span>Export</span>
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
            <Button style={{display: 'block', margin: '0 auto'}} onClick={() => props.csvProps.onExport()} variant="primary">Export CSV</Button>
            <BootstrapTable bootstrap4 {...props.baseProps} filter={ filterFactory() } filterPosition={'top'}/>
          </div>
        )
      }
    </ToolkitProvider>
  );
}

export default Table;
