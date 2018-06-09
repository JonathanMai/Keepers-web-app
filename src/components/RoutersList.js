import React, { Component } from 'react';
import App from './App';
import LoginPage from './pages/LoginPage';
import RestartPasswordPage from './pages/RestartPasswordPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class RoutersList extends Component {
    render() {
        if(localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null) {
            this.updateRedux.bind(this).call();
        }
        return (
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={LoginPage} />
                <Route path="/restore-password" exact component={localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null ? App : RestartPasswordPage} />
                <Route path="/keepers-dashboard" exact component={ localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null ? Dashboard : App} />
                <Route render={() => <h1>{this.props.currLang.page_not_found}</h1>} />
            </Switch>
        </Router>
        )
    }

    updateRedux() {
        let user = {
          id: localStorage.getItem("_id"),
          authKey: localStorage.getItem("_token")
        }
        this.props.setUser(user);
    }
}

const mapStateToProps = (state) => {
    return {
        currLang: state.lang.currLang
    };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(RoutersList);