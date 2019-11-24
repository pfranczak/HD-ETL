import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import Table from "./Table";


export default ({extractData, transformData, getTransformed}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if(loading) {
    return <Spinner size="lg" animation="border" variant="primary" />
  }

  if(data === null) {
    return (
      <Button
        variant="primary"
        size={'lg'}
        onClick={async () => {
          setLoading(true);
          await extractData();
          await transformData();
          const data = await getTransformed();
          setLoading(false)
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
