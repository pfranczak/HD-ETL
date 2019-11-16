import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';



const products = [ {name: 'dupa', id: 'dupa3', price: 10},  {name: 'dupa', id: 'dupa2', price: 11},  {name: 'dupa', id: 'dupa1', price: 12} ];
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true,
}];
function Table({ data }) {
  console.log(data);
  return (
    <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } />
  );
}

export default Table;
