import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import RestartPasswordPage from './pages/RestartPasswordPage';
import Dashboard from './pages/Dashboard';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

/* Router list class responsible for changing the page path and to load the component for specific path */
class RoutersList extends Component {
    constructor(props) {
        super(props);
        this.bindFunction();
    }

    // bind all the functions to the class
    bindFunction() {
        this.checkStorage.bind(this);
        this.updateRedux.bind(this);
    }

    componentDidMount() {
        if(this.checkStorage) { // if the user already login update the redux
            this.updateRedux();
        }
    }
    
    // return true if user already login else return false
    checkStorage() { 
        return localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null;
    }

    // set the user in redux
    updateRedux() {
        let user = {
          id: localStorage.getItem("_id"),
          authKey: localStorage.getItem("_token")
        }
        this.props.setUser(user);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/login" />}/>
                    <Route path="/login" exact component={(browserHistory) => this.checkStorage() ? <Redirect to="/keepers-dashboard" /> : <LoginPage history={browserHistory.history}/>} />
                    <Route path="/register" exact component={(browserHistory) => this.checkStorage() ? <Redirect to="/keepers-dashboard"/> : <LoginPage history={browserHistory.history}/>} />
                    <Route path="/restore-password" exact component={(browserHistory) => this.checkStorage() ? <Dashboard/> : <RestartPasswordPage history={browserHistory.history}/>} />
                    <Route path="/keepers-dashboard" exact component={() => this.checkStorage() ? <Dashboard /> : <Redirect to='/login' />} /> 
                    <Route render={() => <h1>{this.props.currLang.page_not_found}</h1>} />
                </Switch>
            </Router>
        );
    }
}

// variables used from redux.
const mapStateToProps = (state) => {
    return {
        panel_color: state.Modal.panel_color,       // current banner background color
        currLang: state.DisplayLanguage.currLang    // current language of the application
    };
};

// functions used from redux.
const mapDispatchToProps = (dispatch) => {
    return {
        // set the user in redux -> val is object {key:value}
        setUser: (val) => {    
            dispatch({
                type: "SET_USER",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutersList);