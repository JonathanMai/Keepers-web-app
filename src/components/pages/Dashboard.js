import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { GetById, GetProfileByID, GetAllChildren } from "../../serviceAPI";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childrens: []
        }
        this.getAllChildren = this.getAllChildren.bind(this);
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
            console.log("parse json:" + JSON.parse(res.data) + "\n")
            JSON.parse(res.data.map)(child => {
                this.setState({
                    childrens: this.state.childrens.push(child)
                });
            });

        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.response);
        });
    }


    render() {           
        console.log(this.state.childrens);
        

        return  <div>
                    <h1> INSIDE DASHBOARD ;)</h1>
                    {/* <Tabs>
                        {this.state.childrens.map(child => <Tab>{child.name}</Tab>) }
                    </Tabs> */}
                </div>
    }
}

export default Dashboard;