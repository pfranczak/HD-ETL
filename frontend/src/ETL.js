import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import Table from "./Table";


export default ({extractData, transformData, getTransformed}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if(loading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }

  if(data === null) {
    return (
      <Button
        variant="primary"
        onClick={async () => {
          setLoading(true);
          await extractData();
          await transformData();
          const data = await getTransformed();
          setData(data)
        }}
      >
        ETL
      </Button>
    )
  }

  return (
    <Table data={data}/>
  )
}
