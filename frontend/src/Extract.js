import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default ({ extractData }) => {
  const [response, setResponse] = useState(null);
  return (
    <div style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    }}>
      <h5>Extract</h5>
      <Button variant="primary" onClick={() => {
        extractData().then(response => setResponse(response))
      }}>Extract</Button>
    </div>
  )
}
