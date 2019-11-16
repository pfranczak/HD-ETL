import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from './Table';

export default ({ getTransformed }) => {
  const [data, setData] = useState(null);
  return (
    <div style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    }}>
      <Button variant="primary" onClick={() => {
        getTransformed().then(response => setData(response))
      }}>Load</Button>
      <Table data={data}/>
    </div>
  )
}
