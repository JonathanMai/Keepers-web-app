import React, { Component } from 'react';
import RoutersList from './RoutersList';
import store from '../store';
import { Provider } from 'react-redux';
import Banner from '../components/panels/Banner';
import './App.css';

// This is the main component called once from index.js
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <Banner /> 
            <RoutersList />
          </div>
        </Provider>
       </div>
    );
  }
}

export default App;
