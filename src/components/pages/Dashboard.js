import React, { Component } from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import { GetById, GetProfileByID, GetAllChildren, GetMessagesStatistics, GetMessagesHeads, GetBatteryLevel } from "../../serviceAPI";
import AbusiveConversationsChart from '../Charts/AbusiveConversationsChart';
import UsageTimeChart from '../Charts/UsageTimeChart';
import { connect } from 'react-redux';
import moment from 'moment';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0, // Holds the current tab index the user viewing.
            date: [1523674486890, 1524672883410],
            daysRange: 0,
            draw: false,
            childrens: [], // Holds all the childrens(objects).
            dateLabels: [],
            abusiveChartData: [],
            usageTimeChartData: [],
            messagesHeads: []
        }
        
        // Binds all the functions.
        this.bindFunctions();
        console.log(moment().format("Z"));
        // this.createUsageTimeDataset = this.createUsageTimeDataset.bind(this);
        this.getAllChildren(); // Checks how many childrens there are in the account.
    }

    bindFunctions() {
        this.handleSelect = this.handleSelect.bind(this);
        this.buildTab = this.buildTab.bind(this);
        // this.getAllChildren = this.getAllChildren.bind(this);
        // this.getDatesLabels = this.getDatesLabels.bind(this);
        // this.getChildMessagesStatistics = this.getChildMessagesStatistics.bind(this);
        // this.createStatisticsDataset = this.createStatisticsDataset.bind(this);
        // this.getChildUsageTime = this.getChildUsageTime.bind(this);
        // this.getMessagesHeads = this.getMessagesHeads.bind(this);
        // this.addPageToArray = this.addPageToArray.bind(this);
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
        return moment(millisec).format("Do MM");
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
            this.setState({
                ...this.state,
                daysRange: this.state.date.length > 1 ? moment.utc(this.state.date[1]).startOf('day').diff(moment.utc(this.state.date[0]).startOf('day'), 'days') : 1
            });
            this.getDatesLabels();
            this.getChildMessagesStatistics();
            // this.getChildUsageTime();
            this.getMessagesHeads();
            // GetMessages(this.state.childrens[0].id, moment.utc(this.state.date[0]).startOf('day'), moment.utc(this.state.date[1]).add(1,'days').startOf('day'), 0).then(res => {  // When respond package is with status 200
            //     console.log(res);
            // });
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log("error");
        });

    }

    //Gets all the labels.
    getDatesLabels() {
        let day = moment.utc(this.state.date[0]); // Creates a moment object from the first day.
        let labels = [];
        for(let i=0; i<=this.state.daysRange; i++){
            labels.push(moment.utc(day).add(i,'days').format("MMM Do").toString());
            console.log();
        }
        this.setState({
            ...this.state,
            dateLabels: labels
        });
    }

    // Gets the child statistics and sets data using it.
    getChildMessagesStatistics() {
        let day = moment.utc(this.state.date[0]); // Creates a moment object from the first day.
        let lastDay = moment.utc(this.state.date[1]);
        // var stillUtc = moment.utc(lastDay).toDate();
        // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
        let newData = [];
        let flag = 0;
        let daysRange = this.state.daysRange;

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
                    let index = j;
                    GetMessagesStatistics(child, moment.utc(tempDay).startOf('day'), moment.utc(tempDay).add(1,'days').startOf('day')).then(res => {  // When respond package is with status 200
                        let result = res.data;
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
                            },105);
                        }
                    }).catch(error => { // When respond package is with error status - 400 ...
                        console.log(error.data);
                    });
                };
                tempData.push(countEasy);
                tempData.push(countMedium);
                tempData.push(countHard);
                newData.push(tempData);
                this.createStatisticsDataset(tempData);
        }
    }


    createStatisticsDataset(data){
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
        
        this.setState({
            ...this.state,
            abusiveChartData: oldData
        });
    }

    getMessagesHeads() {
        let messagesHeads = [];
        // for(let page=0; page<5 && messagesExists==true; page++) {
        this.addPageToArray(messagesHeads, 0);
        this.setState({
            ...this.state,
            messagesHeads: messagesHeads
        })
        console.log(messagesHeads);
    }

    addPageToArray(messagesHeads, page) {
        GetMessagesHeads(this.state.childrens[0].id, moment.utc(this.state.date[0]).startOf('day'), moment.utc(this.state.date[1]).add(1,'days').startOf('day'), page).then(res => {  // When respond package is with status 200
            if(res.data.length > 0) {
                messagesHeads.push(res.data);
                this.addPageToArray(messagesHeads, page+1);
            }
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.data);
        });
    }

    // Gets and sets the child usage time.
    getChildUsageTime() {

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
        console.log("hi");
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
                    <Col xs={9} md={7} xl={7}>   
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
                                    duration: 1000,
                                    easing: 'linear'
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 1
                                        }
                                    }]
                                }
                            }}
                            redraw
                        />
                        Usage time
                        <Bar
                            data={this.state.usageTimeChartData}
                            height={60}
                            options={{
                                maintaninAspectRatio: false
                            }}
                        />
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
                    <Tabs defaultActiveKey={this.state.tab} id="Dashboard_tabs" onSelect={this.handleSelect}  animation={false}>
                        { this.state.childrens.map((child,index) => 
                            <Tab key={index} title={child.name} eventKey={index} mountOnEnter={true} unmountOnExit={true}>
                                {this.state.draw && this.buildTab()}
                            </Tab>)
                        } 
                    </Tabs>
                </div>)
    }
}

export default Dashboard;