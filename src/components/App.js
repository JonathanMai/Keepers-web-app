import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.updateRedux = this.updateRedux.bind(this);
  }
  
  render() {
    return (
      <div className="App">
        {
          localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null ? this.updateRedux() : (<Redirect to="/login"/>)
        }
      </div>
    );
  }

  updateRedux() {
    let user = {
      id: localStorage.getItem("_id"),
      authKey: localStorage.getItem("_token")
    }
    this.props.setUser(user);
    return (<Redirect to="/keepers-dashboard"/>) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setUser: (val) => {    
          dispatch({
              type: "SET_USER",
              value: val
          });
      }
  };
};

export default connect(null, mapDispatchToProps)(App);
