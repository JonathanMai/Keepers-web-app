import React, { Component } from 'react';
import App from './App';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class RoutersList extends Component {
    render() {
        return (
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={LoginPage} />
                <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </Router>
        )
    }
}

export default RoutersList;