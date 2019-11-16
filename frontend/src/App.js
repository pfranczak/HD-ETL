import React  from 'react';
import axios from 'axios';
import Extract from './Extract'
import ETL from './ETL'
import Load from './Load'

const API_URL = 'http://localhost:3001';

const extractData = () => {
  return axios.post(`${API_URL}/extract`)
    .then(res => res.data);
};

const transformData = () => {
  return axios.post(`${API_URL}/transformed`)
    .then(res => res.data);
};

const getTransformed = () => {
  return axios.get(`${API_URL}/transformed`)
    .then(res => res.data);
};

function App() {
  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>

     <ETL getTransformed={getTransformed} extractData={extractData} transformData={transformData}/>
    </div>
  );
}

export default App;
