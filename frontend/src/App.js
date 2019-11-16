import React from 'react';
import axios from 'axios';
import Extract from './Extract'

const API_URL = 'http://localhost:3001';

const extractData = () => {
  return axios.post(`${API_URL}/extract`)
    .then(res => res.data);
};

function App() {
  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <Extract extractData={extractData}/>
    </div>
  );
}

export default App;
