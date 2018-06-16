import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import RestartPasswordPage from './pages/RestartPasswordPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Banner from '../components/panels/Banner';

class RoutersList extends Component {
    constructor(props) {
        super(props);
        this.checkStorage.bind(this);
        this.updateRedux.bind(this);
    }
    render() {
        if(this.checkStorage) {
            this.updateRedux();
        }
        return (
            <div>
                <Banner color={this.props.panel_color}/>
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
            </div>
        );
    }

    checkStorage() {    // if true already logged in
        return localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null;
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
        currLang: state.lang.currLang,
        panel_color: state.reducerA.panel_color
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