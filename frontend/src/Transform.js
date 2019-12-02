import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Table from './Table';

export default ({ transformData, nextStep }) => {
	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

  const transform = () => {
    setIsLoading(true);
    transformData().then(response => {
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
      <Button variant="primary"
              onClick={transform}
              style={{marginBottom: '10px'}}
      >
        Transform
      </Button>
			{isLoading && <>
        <Spinner size="lg" animation="border" variant="primary" />
        <h3>Transforming data...</h3>
      </>}
      {response && <>
        <h3>Transforming succeeded.</h3>
        <h4>Transformed <span style={{color: '#007bff'}}>{response.extractedAmount || 0}</span> items.</h4>
        <Button variant="info" onClick={nextStep}>Next step</Button>
      </>}
    </div>
  )
}
