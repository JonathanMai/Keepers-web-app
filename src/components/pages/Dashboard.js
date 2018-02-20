import React, { Component } from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { GetById, GetProfileByID, GetAllChildren } from "../../serviceAPI";
import Charts from '../Charts';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childrens: [],
            tab: 0
        }
        this.getAllChildren = this.getAllChildren.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.buildTab = this.buildTab.bind(this);
        this.getAllChildren();
    }

    getById() {

        GetById().then(res => {  // When respond package is with status 200
            console.log(res);   
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.response);
        });
    }

    getProfileByID() {
        GetProfileByID().then(res => {  // When respond package is with status 200
            console.log(res);   
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.response);
        });
    }

    getAllChildren() {
        GetAllChildren().then(res => {  // When respond package is with status 200
            var children = [];
            res.data.map(obj => {children.push(obj)});
            this.setState({
                    childrens: children
            });

        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.response);
        });
    }

    handleSelect(key) {
        this.setState({
            ...this.state,
            tab: key
        });
       console.log(key);
    }

    buildTab() { // TODO: need to style it as part of the page(another panel).
        console.log("tab");
        return 
            <div>
                Graph of abusive conversations
                <Charts child={this.state.tab}/>
                Usage time
            </div>
    }

    render() {                   
        return  (<div>
                    <h1> INSIDE DASHBOARD ;)</h1>
                    <ul className="tabs-nav nav navbar-nav navbar-left">
                    </ul>
                    <Tabs defaultActiveKey={this.state.tab} id="Dashboard_tabs" onSelect={this.handleSelect}>
                        { this.state.childrens.map((child,index) => <Tab key={index} title={child.name} eventKey={index}>{this.buildTab()}</Tab>)} 
                    </Tabs>
                </div>)
    }
}

export default Dashboard;