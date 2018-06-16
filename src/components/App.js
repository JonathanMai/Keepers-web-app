import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RoutersList from './RoutersList';
import store from '../store';
import { Provider } from 'react-redux';
import './App.css';
import Banner from '../components/panels/Banner';


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
