import React, { useState }  from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, NavLink
} from "react-router-dom";
import c from 'classnames';
import Steps from './Steps'
import ETL from './ETL';
import './App.css'

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

  const [tab, setTab] = useState(0);

  return (
    <Router>
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">ETL</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/etl" className={"nav-link"} activeClassName="active">
                  Entire process
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/steps" className={"nav-link"} activeClassName="active">
                  Steps
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/etl">
            <div className="etl-container">
              <ETL getTransformed={getTransformed} extractData={extractData} transformData={transformData}/>
            </div>
          </Route>
          <Route path="/steps">
            <div className="etl-container">
              <Steps getTransformed={getTransformed} extractData={extractData} transformData={transformData}/>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
