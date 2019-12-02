import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Table from './Table';

export default ({ getTransformed }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = () => {
    setIsLoading(true);
    getTransformed().then(response => {
      setResponse(response);
      setIsLoading(false);
    });
  };

  return (
    <div style={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
    }}>
     {!response && <Button variant="primary"
              onClick={load}
              style={{marginBottom: '10px'}}
      >
        Load
      </Button>}
      {isLoading && <>
        <Spinner size="lg" animation="border" variant="primary" />
        <h3>Loading data...</h3>
      </>}
      {response && <Table data={response}/>}
    </div>
  )
}
