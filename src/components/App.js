import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Link to={"/login"}>To login page</Link>.
        </p> */}
        <Redirect to="/keepers-dashboard"/>
        <iframe src="index.js">
                    <p>Your browser does not support iframes.</p>
                </iframe>
      </div>
    );
  }
}

export default App;
