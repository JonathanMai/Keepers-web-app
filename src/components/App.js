import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        {
          localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null ? <Redirect to="/keepers-dashboard"/> : (<Redirect to="/login"/>)
        }
      </div>
    );
  }

}
export default App;
