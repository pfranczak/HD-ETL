import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default ({ extractData }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const extract = () => {
    setIsLoading(true);
    extractData().then(response => {
      setResponse(response);
      setIsLoading(false);
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Button variant="primary"
              onClick={extract}
              style={{marginBottom: '10px'}}
      >
        Extract
      </Button>
      {isLoading && <>
        <Spinner size="lg" animation="border" variant="primary" />
        <h3>Extracting data...</h3>
      </>}
      {response && <>
        <h3>Extracting succeeded.</h3>
        <h4>Extracted <span style={{color: '#007bff'}}>{response.extractedAmount}</span> items.</h4>
      </>}
    </div>
  )
}
