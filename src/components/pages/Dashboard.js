import React, { Component } from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { Line, Chart} from 'react-chartjs-2';
import { GetById, GetProfileByID, GetAllChildren, GetMessagesStatistics } from "../../serviceAPI";
import AbusiveConversationsChart from '../Charts/AbusiveConversationsChart';
import UsageTimeChart from '../Charts/UsageTimeChart';
import { connect } from 'react-redux';
import moment from 'moment';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0, // Holds the current tab index the user viewing.
            date: [1523745328078, 1524475486880],
            draw: false,
            childrens: [], // Holds all the childrens(objects).
            dateLabels: [],
            abusiveChartData: []
        }
        
        // Binds all the functions.
        this.getAllChildren = this.getAllChildren.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.buildTab = this.buildTab.bind(this);
        this.getChildMessagesStatistics = this.getChildMessagesStatistics.bind(this);
        this.createDataset = this.createDataset.bind(this);

        this.getAllChildren(); // Checks how many childrens there are in the account.
    }

    // getById() {
    //     GetById().then(res => {  // When respond package is with status 200
    //         console.log(res);   
    //     }).catch(error => { // When respond package is with error status - 400 ...
    //         console.log(error.response);
    //     });
    // }

    // getProfileByID() {
    //     GetProfileByID().then(res => {  // When respond package is with status 200
    //         console.log(res);   
    //     }).catch(error => { // When respond package is with error status - 400 ...
    //         console.log(error.response);
    //     });
    // }
    
    // Convert milliseconds to date.
    millisecToDate(millisec) {
        return moment(millisec).format("DD MMMM");
    }

    // Sets how many childrens the user have.
    getAllChildren() {
        GetAllChildren().then(res => {  // When respond package is with status 200
            var children = [];
            res.data.map(obj => {children.push(obj)});
            this.setState({
                    ...this.state,
                    childrens: children
            });
            this.getChildMessagesStatistics();
            console.log("FINE");

        }).catch(error => { // When respond package is with error status - 400 ...
            console.log("error");
        });

    }

    // Gets the child statistics and sets data using it.
    getChildMessagesStatistics() {
        let day = moment.utc(this.state.date[0]); // Creates a moment object from the first day.
        let lastDay = moment.utc(this.state.date[1]);
        // var stillUtc = moment.utc(lastDay).toDate();
        // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
        let daysRange =  this.state.date.length > 1 ? moment(lastDay).diff(moment(day), 'days') : 1; // Sets the count of the days in range.
        let labels = [];
        let newData = [];
        let flag = 0;

        for(let i=0; i<this.state.childrens.length;  i++) {
            let tempDay = moment.utc(day);
            let tempData = [];
            let countEasy = new Array(daysRange);
            let countMedium = new Array(daysRange);
            let countHard = new Array(daysRange);

            let child = this.state.childrens[i].id; // Gets the child id.
                for(let j=0; j<=daysRange;  j++, tempDay=moment.utc(day).add(j,'days')) {
                    // datesLabel.push(moment(day).format("MMMM DD"));
                    // day=moment(day).add(1,'days').format("MMMM D");
                    if(i == 0)
                        labels.push(moment.utc(tempDay).format("MMMM D").toString());
                    let index = j;
                    GetMessagesStatistics(child, moment.utc(tempDay).startOf('day'), moment.utc(tempDay).add(1,'days').startOf('day')).then(res => {  // When respond package is with status 200
                        let result = res.data;
                        console.log(result);
                        countEasy[index] = (parseInt(result.easyCount)); // easy count.
                        countMedium[index] = (parseInt(result.mediumCount)); // medium count.
                        countHard[index] = (parseInt(result.heavyCount)); // heavy count.
                        flag++;
                        if(this.state.draw == false && flag >= daysRange){
                            setTimeout(() => {
                                this.setState({
                                    ...this.state,
                                    draw: true
                                });
                            },100);

                        }
                    }).catch(error => { // When respond package is with error status - 400 ...
                        console.log(error.data);
                    });
                };
                if(i == 0)
                    this.setState({
                        ...this.state,
                        dateLabels: labels
                    });
                tempData.push(countEasy);
                tempData.push(countMedium);
                tempData.push(countHard);
                newData.push(tempData);
                this.createDataset(tempData);
                console.log(this.state);

        }



        console.log(this.state);
    }


    createDataset(data){
        let newData = {
            labels: this.state.dateLabels,
            datasets:[
                // Level 1 words - lowest words
                {
                    label:['level 1'],
                    data: data[0],
                    borderColor: 'rgba(255, 230, 100, 1)',
                    pointRadius: 2,
                    fill: false
                },
                // Level 2 words - medium words
                {
                    label:['level 2'],
                    data: data[1],
                    borderColor: 'rgba(255, 128, 0, 1)',
                    pointRadius: 2,
                    fill: false
                },
                // Level 3 words - worst words
                {                 
                    label:['level 3'],
                    data: data[2],
                    borderColor: 'rgba(255, 0, 0, 1)',
                    pointRadius: 2,
                    fill: false
                }
            ],
        };
        let oldData = this.state.abusiveChartData;
        oldData.push(newData);

        console.log("HERERERERERERERERERERE");
        console.log(this.state);
        this.setState({
            ...this.state,
            abusiveChartData: oldData
        });
    }

    // Handles the selcted tab that was pushed. 0527250985
    handleSelect(key) {

        this.setState({
            ...this.state,
            tab: key
        });
    }

    // Builds the picked tab(using the children information).
    buildTab() { // TODO: need to style it as part of the page(another panel).
        console.log("FUCCCCCCCCCCCCCCCCCCCCCCK");
        return (
            <div>
                <Row >
                    <Col xs={9} md={7} xl={10}>   
                            Graph of abusive conversations
                    </Col>
                    {/* TODO: need to implement the buttons logic */}
                    {/* <Col xs={6} md={4}>
                        <Button>
                                Day
                        </Button>
                        <Button>
                                Week
                        </Button>
                        <Button>
                                Month
                        </Button>
                    </Col> */}
                </Row>
                <Row >
                    <Col xs={9} md={7} xl={10}>   
                        <Line
                            id="line"
                            ref="line"
                            data={this.state.abusiveChartData[this.state.tab]}
                            heigh={60}
                            backgroundColor={"transperant"}
                            options={{
                                legend: {
                                    display: false
                                 },
                                 tooltips: {
                                    enabled: true,
                                    mode: 'label',
                                    intersect: false,
                                    displayColors: false,
                                 },
                                maintaninAspectRatio: false,
                                animation: {
                                    duration: 100,
                                    easing: 'easeInCubic'
                                }
                            }}
                            redraw
                        />
                        Usage time
                        <UsageTimeChart child={this.state.tab} labels={this.state.labels} />
                    </Col>
                    <Col xs={6} md={4}>
                        Offensive conversations
                    </Col>
                </Row>
                <Row>
                    GPS
                </Row>
            </div>
        );
    }

    render() {    // TODO: fix this - style it   
        return  (   this.state.childrens.length == 0 ? "No Childrens in app" :             
                <div>
                    <h1> INSIDE DASHBOARD ;)</h1>
                    <ul className="tabs-nav nav navbar-nav navbar-left">
                    </ul>
                    <Tabs defaultActiveKey={this.state.tab} id="Dashboard_tabs" onSelect={this.handleSelect} animation={false}>
                        { this.state.childrens.map((child,index) => 
                            <Tab key={index} title={child.name} eventKey={index}>
                                {this.state.draw && this.buildTab()}
                            </Tab>)
                        } 
                    </Tabs>
                </div>)
    }
}

export default Dashboard;