import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { GetById, GetProfileByID, GetAllChildren } from "../../serviceAPI";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childrens: [],
            initialTab: 0
        }
        this.getAllChildren = this.getAllChildren.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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
       console.log("aaaaa");
    }

    render() {                   
        return  (<div>
                    <h1> INSIDE DASHBOARD ;)</h1>
                    <Tabs defaultActiveKey={this.state.initialTab} id="Dashboard_tabs">
                        { this.state.childrens.map((child,index) => <Tab key={index} title={child.name} onSelect={this.handleSelect} eventKey={index}/>)} 
                    </Tabs>
                </div>)
    }
}

export default Dashboard;