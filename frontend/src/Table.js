import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';



const columns = [{
  dataField: 'city',
  text: 'Cities',
  sort: true,
}, {
  dataField: 'company',
  text: 'Company Name',
  sort: true,
}, {
  dataField: 'currency',
  text: 'Currency',
  sort: true,
}, {
  dataField: 'date',
  text: 'Date',
  sort: true,
}, {
  dataField: 'position',
  text: 'Position',
  sort: true,
}, {
  dataField: 'salaryLow',
  text: 'Salary Low',
  sort: true,
}, {
  dataField: 'salaryTop',
  text: 'Salary High',
  sort: true,
}, {
  dataField: 'tags',
  text: 'Tags',
  sort: true,
},
];
function Table({ data }) {
  const transData = data.data.map(ele => ({...ele, city: ele.city.join(','), tags: ele.tags.join(',')}));
  return (
    <BootstrapTable bootstrap4 keyField='id' data={ transData } columns={ columns } />
  );
}

export default Table;
