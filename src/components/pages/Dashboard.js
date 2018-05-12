// import React, { Component } from 'react';
// import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
// import { Line, Bar } from 'react-chartjs-2';
// import { GetById, GetProfileByID, GetAllChildren, GetMessagesStatistics, GetMessagesHeads, GetBatteryLevel, GetEntireMessage } from "../../serviceAPI";
// import AbusiveConversationsChart from '../charts/AbusiveConversationsChart';
// import UsageTimeChart from '../charts/UsageTimeChart';
// import MsgsPanel from '../MsgsPanel';
// import Box from '../Box';
// import { connect } from 'react-redux';
// import moment from 'moment';

// class Dashboard extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             date: [1524472883410, 1525166748869],
//             daysRange: 0,
//             draw: [false, false],
//             childrens: [], // Holds all the childrens(objects).
//             dateLabels: [],
//             dataSet: [],
//             childrensData: [],
//             getData: [],
//             //goes into childs Data
//             abusiveChartData: [], 
//             usageTimeChartData: [],
//             messagesHeads: [],
//             showEntireMessage: false
//         }
        
//         // Binds all the functions.
//         this.bindFunctions();
//         // console.log(parseInt(moment().format("Z")));
//         // this.createUsageTimeDataset = this.createUsageTimeDataset.bind(this);
//         // this.getAllChildren(); // Checks how many childrens there are in the account.
//         // console.log(this.state);
//     }

//     // Before render, gets all the data needed and shows it.
//     componentWillMount() {
//         this.getAllChildren(); // Gets all children data.
//     }

//     bindFunctions() {
//         this.handleTabSelect = this.handleTabSelect.bind(this);
//         this.buildTab = this.buildTab.bind(this);
//         this.handleMessageSelect = this.handleMessageSelect.bind(this);
//         // this.getAllChildren = this.getAllChildren.bind(this);
//         // this.getDatesLabels = this.getDatesLabels.bind(this);
//         // this.getChildMessagesStatistics = this.getChildMessagesStatistics.bind(this);
//         // this.createStatisticsDataset = this.createStatisticsDataset.bind(this);
//         // this.getChildUsageTime = this.getChildUsageTime.bind(this);
//         // this.getMessagesHeads = this.getMessagesHeads.bind(this);
//         // this.addPageToArray = this.addPageToArray.bind(this);
//     }

//     // getById() {
//     //     GetById().then(res => {  // When respond package is with status 200
//     //         console.log(res);   
//     //     }).catch(error => { // When respond package is with error status - 400 ...
//     //         console.log(error.response);
//     //     });
//     // }

//     // getProfileByID() {
//     //     GetProfileByID().then(res => {  // When respond package is with status 200
//     //         console.log(res);   
//     //     }).catch(error => { // When respond package is with error status - 400 ...
//     //         console.log(error.response);
//     //     });
//     // }

//     // Sets how many childrens the user have.
//     getAllChildren() {
//         GetAllChildren().then(res => {  // When respond package is with status 200
//             var children = [];
//             res.data.map(obj => {children.push(obj)});
//             let size = children.length;
//             this.setState({
//                     ...this.state,
//                     childrens: children,
//                     childrensData: new Array(size),
//                     getData: new Array(size),
//                     daysRange: this.state.date.length > 1 ? moment.utc(this.state.date[1]).startOf('day').diff(moment.utc(this.state.date[0]).startOf('day'), 'days') : 1
//             });

//             this.getDatesLabels();
//             this.getAllChildsData();
//             // this.getChildUsageTime();
//             // setTimeout(
//             // this.getMessagesHeads();
//             // GetMessages(this.state.childrens[0].id, moment.utc(this.state.date[0]).startOf('day'), moment.utc(this.state.date[1]).add(1,'days').startOf('day'), 0).then(res => {  // When respond package is with status 200
//             //     console.log(res);
//             // });
//         }).catch(error => { // When respond package is with error status - 400 ...
//             console.log("error");
//         });

//     }

//     //Gets all the labels.
//     getDatesLabels() {
//         let day = moment.utc(this.state.date[0]); // Creates a moment object from the first day.
//         let labels = [];
//         for(let i=0; i<=this.state.daysRange; i++){
//             labels.push(moment.utc(day).add(i,'days').format("MMM Do").toString());
//         }
//         this.setState({
//             ...this.state,
//             dateLabels: labels
//         });
//     }

//     getAllChildsData() {
//         for(let i=0; i<this.state.childrens.length;  i++) {
//             if(this.dataIsSet(i) === false) {
//                 this.getChildData(i);
//             }
//         }
//     }

//     dataIsSet(index) {
//         let tempGetData = this.state.getData;
//         // Sets the get data array to true in the right spot - so it wont be called again.
//         if(tempGetData[index] === true){
//             return true;
//         }
//         tempGetData[index] = true;
//         this.setState({
//             ...this.state,
//             getData: tempGetData
//         });
//         return false;
//     }

//     getChildData(index) {
//         this.getChildMessagesStatistics(index);
//         this.getMessagesHeads(index);
//     }

//     // Gets the child statistics and sets data using it.
//     getChildMessagesStatistics(index) {
//         let day = moment(this.state.date[0]); // Creates a moment object from the first day.
//         // let lastDay = moment.utc(this.state.date[1]);
//         // var stillUtc = moment.utc(lastDay).toDate();
//         // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
//         let newData = [];
//         let daysRange = this.state.daysRange;
//         // console.log(moment.utc(this.state.date[0]).startOf('day').valueOf(),"and", moment(this.state.date[0]).startOf('day').valueOf());

        
//         // for(let i=0; i<this.state.childrens.length;  i++) {
//             // console.log(i); 
//         let tempDay = moment(day);
//         let countEasy = new Array(daysRange);
//         let countMedium = new Array(daysRange);
//         let countHard = new Array(daysRange);
//         let flag = 0;
//         let child = this.state.childrens[index].id; // Gets the child id.
//         for(let i=0; i<=daysRange;  i++, tempDay=moment(day).add(i,'days')) {
//             // datesLabel.push(moment(day).format("MMMM DD"));
//             // day=moment(day).add(1,'days').format("MMMM D");
//             // if(i ===2 | i === 3) {
//             //     console.log(child, moment(tempDay).startOf('day').valueOf(),"and", moment(tempDay).endOf('day').valueOf())
//             //     console.log(child, moment.utc(tempDay).startOf('day').valueOf(),"and", moment.utc(tempDay).add(1,'days').startOf('day').valueOf())
//             // }
//             GetMessagesStatistics(child, moment(tempDay).startOf('day').valueOf(), moment(tempDay).endOf('day').valueOf()).then(res => {  // When respond package is with status 200
//                 let result = res.data;
//                 countEasy[i] = (parseInt(result.easyCount)); // easy count.
//                 countMedium[i] = (parseInt(result.mediumCount)); // medium count.
//                 countHard[i] = (parseInt(result.heavyCount)); // heavy count.
//                 flag++;
//                 if(flag > daysRange){
//                     let tempData = [];
//                     tempData.push(countEasy);
//                     tempData.push(countMedium);
//                     tempData.push(countHard);
//                     newData.push(tempData);
//                     this.createStatisticsDataset(index, tempData);
//                     // if(this.state.draw[0] == false){
//                     //     let tempDraw = this.state.draw;
//                     //     tempDraw[0] = true;
//                     //     this.setState({
//                     //         ...this.state,
//                     //         draw: tempDraw
//                     //     });
//                     //     console.log(this.state.draw);
//                     // }
//                 }
//             }).catch(error => { // When respond package is with error status - 400 ...
//                 console.log(error.data);
//             });
//         };
//         // }
//     }


//     createStatisticsDataset(index, data){
//         let newData = {
//             labels: this.state.dateLabels,
//             datasets:[
//                 // Level 1 words - lowest words
//                 {
//                     label:['level 1'],
//                     data: data[0],
//                     borderColor: 'rgba(255, 230, 100, 1)',
//                     pointRadius: 2,
//                     fill: false
//                 },
//                 // Level 2 words - medium words
//                 {
//                     label:['level 2'],
//                     data: data[1],
//                     borderColor: 'rgba(255, 128, 0, 1)',
//                     pointRadius: 2,
//                     fill: false
//                 },
//                 // Level 3 words - worst words
//                 {                 
//                     label:['level 3'],
//                     data: data[2],
//                     borderColor: 'rgba(255, 0, 0, 1)',
//                     pointRadius: 2,
//                     fill: false
//                 }
//             ],
//         };
//         let childrensData = this.state.childrensData;
//         childrensData[index] = Object.assign({abusiveChartData: newData}, this.state.childrensData[index]);
//         // let dataSet = this.state.dataSet;
//         this.setState({
//             ...this.state,
//             childrensData: childrensData
//         });

//         // dataSet[this.state.tab] = true;
//         // console.log(this.state.childrens.messagesHeads);
//         // let oldData = this.state.abusiveChartData;

//         // this.setState({
//         //     ...this.state,
//         //     abusiveChartData: oldData
//         // });
//     }

//     getMessagesHeads(index) {
//         let messagesHeads = [];
//         this.addPageToArray(index, messagesHeads, 0);
//         // let tempDraw = this.state.draw;
//         // let childrensData = this.state.childrensData;
//         // childrensData[index] = Object.assign({messagesHeads: messagesHeads}, this.state.childrensData[index]);
//         // tempDraw[1] = true;
//         // this.setState({
//         //     ...this.state,
//         //     childrensData: childrensData
//         // });
//         // this.setState({
//         //     ...this.state,
//         //     draw: tempDraw,
//         //     messagesHeads: messagesHeads
//         // })
//         // console.log(this.state.draw);
//     }

//     addPageToArray(index, messagesHeads, page) {
        
//         GetMessagesHeads(this.state.childrens[index].id, moment.utc(this.state.date[0]).startOf('day'), moment.utc(this.state.date[1]).endOf('day'), page).then(res => {  // When respond package is with status 200
//             if(res.data.length > 0) {
//                 res.data.map(message => messagesHeads.push(message));
//                 this.addPageToArray(index, messagesHeads, page+1);
//                 // console.log(this.state.childrensData[index])
//             }
//             else {
//                 let tempDraw = this.state.draw;
//                 let childrensData = this.state.childrensData;
//                 childrensData[index] = Object.assign({messagesHeads: messagesHeads}, this.state.childrensData[index]);
//                 tempDraw[1] = true;
//                 this.setState({
//                     ...this.state,
//                     childrensData: childrensData
//                 });
//             }
//         }).catch(error => { // When respond package is with error status - 400 ...
//             console.log(error);
//         });
//     }

//     // Gets and sets the child usage time.
//     getChildUsageTime() {

//     }
//     // Handles the selcted tab that was pushed. 
//     handleTabSelect(key) {
//         // this.setState({
//         //     ...this.state,
//         //     tab: key
//         // });
//         // console.log("abusive chart data: ", this.state.childrens[key].abusiveChartData)
//         // this.setState({
//         //     ...this.state,
//         //     showEntireMessage: false
//         // });
//         if(this.dataIsSet(key) === false) {
//             this.getChildData(key);
//         }
        
//         // console.log(this.state.childrensData[0].messagesHeads);
//     }

//     handleMessageSelect(childIndex, msgId) {
//         // console.log("hi", index, "crazy");
//         GetEntireMessage(this.state.childrens[childIndex].id, msgId).then(res => {  // When respond package is with status 200
//             // console.log(res);
//             // console.log(childIndex);
//             this.setState({
//                 ...this.state,
//                 showEntireMessage: true
//             });
//             this.buildChatPanel(childIndex, msgId);
//         }).catch(error => { // When respond package is with error status - 400 ...
//             console.log(error.response);
//         });;
//     }

//     buildChatPanel(childIndex) {
//         let chatPanel;
//         if(!this.state.showEntireMessage && this.state.childrensData[childIndex].messagesHeads.length > 0) {
//             chatPanel = this.state.childrensData[childIndex].messagesHeads.map((message) => 
//             <Box childId={this.state.childrens[childIndex].id} msgId={message.id} childIndex={childIndex} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/>
//             );
//             // <Box childId={this.state.childrens[index].id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/>

//         }
//         else if(this.state.showEntireMessage && childIndex !== undefined) {
//             chatPanel = childIndex + " YEAHH";
//         }
//         return chatPanel;

//     }

//     // Builds the picked tab(using the children information).
//     buildTab(childIndex) { // TODO: need to style it as part of the page(another panel).        
//         console.log("build tab");
//         return (
//             <div>
//                 <Grid >
//                     <Row>
//                         <Col xs={8} md={8} xl={8}>   
//                             Graph of abusive conversations
//                         </Col>
//                         {/* TODO: need to implement the buttons logic */}
//                         {/* <Col xs={6} md={4}>
//                             <Button>
//                                     Day
//                             </Button>
//                             <Button>
//                                     Week
//                             </Button>
//                             <Button>
//                                     Month
//                             </Button>
//                         </Col> */}
//                     </Row>
//                     <Row>
//                         <Col xs={8}>   
//                             <Line
//                                 id="line"
//                                 ref="line"
//                                 data={this.state.childrensData[childIndex].abusiveChartData}
//                                 // height={80}
//                                 backgroundColor={"transperant"}
//                                 options={{
//                                     layout: {
//                                         padding: {
//                                             left: 0,
//                                             right: 0,
//                                             top: 20,
//                                             bottom: 0
//                                         }
//                                     },
//                                     legend: {
//                                         display: false
//                                     },
//                                     tooltips: {
//                                         enabled: true,
//                                         mode: 'index',
//                                         intersect: false,
//                                         displayColors: false,
//                                         bodySpacing: 3
//                                     },
//                                     // maintaninAspectRatio: false,
//                                     animation: {
//                                         duration: 0
//                                     },
//                                     hover: {
//                                          animationDuration: 1000
//                                     },
//                                     elements: {
//                                         line: {
//                                             tension: 0.3, // disables bezier curves
//                                             borderJoinStyle: 'miter',
//                                             borderWidth: 2,
//                                             borderJoinStyle: 'round',
//                                             fill: true,
//                                             capBezierPoints: true
//                                             // borderCapStyle: 'square'
//                                             // capBezierPoints: true
//                                         }
//                                     },
//                                     scales: {
//                                         yAxes: [{
//                                             ticks: {
//                                                 beginAtZero: true,
//                                                 stepSize: 1
//                                             }
//                                         }]
//                                     }
//                                 }}
//                                 redraw
//                             />
//                             {/* <AbusiveConversationsChart /> */}
//                             Usage time
//                             <Bar
//                                 data={this.state.usageTimeChartData}
//                                 height={60}
//                                 options={{
//                                     maintaninAspectRatio: false
//                                 }}
//                             />
//                         </Col>
//                         <Col xs={4}>
//                             Offensive conversations
//                             {/* <div id="chat_panel">
//                                 {this.buildChatPanel(kidIndex)}
//                             </div> */}
//                             {/* {console.log("data",this.state.childrensData[childIndex])} */}
//                             {this.state.childrensData !== undefined && this.state.childrensData[childIndex].messagesHeads.length > 0 &&
//                                 <MsgsPanel child={this.state.childrens[childIndex]} childsData={this.state.childrensData[childIndex].messagesHeads} />}
//                         </Col>
//                     </Row>
//                     <Row>
//                         GPS
//                     </Row>
//                 </Grid>
//             </div>
//         );
//     }

//     render() {
//         return  (   this.state.childrens.length == 0 ? "No Childrens in app" :             
//             <div>
//                 <ul className="tabs-nav nav navbar-nav navbar-left">
//                 </ul>
//                 <Tabs defaultActiveKey={0} id="Dashboard_tabs" onSelect={this.handleTabSelect} animation={false}>
//                     { this.state.childrens.map((child,index) => 
//                         <Tab key={index} title={child.name} eventKey={index} >
//                             {this.state.childrensData !== undefined && this.state.childrensData[index] !== undefined && this.state.childrensData[index].abusiveChartData !== undefined && this.state.childrensData[index].messagesHeads !== undefined && this.buildTab(index)}
//                         </Tab>)
//                     }
//                 </Tabs>
//             </div>)
//     }
// }

// export default Dashboard;

import React, { Component } from 'react';
import { GetAllChildren } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import TopPanel from '../panels/TopPanel';
import BottomPanel from '../panels/BottomPanel';
import Dates from '../panels/Dates';

class Dashboard extends Component {
    componentWillMount() {
        GetAllChildren().then(res => {  // When respond package is with status 200
            var childrens = [];
            res.data.map(obj => {childrens.push(obj)});
            this.props.setChildrens(childrens);
            // let size = children.length;
            // this.setState({
            //         ...this.state,
            //         childrens: children,
            //         childrensData: new Array(size),
            //         getData: new Array(size),
            //         daysRange: this.state.date.length > 1 ? moment.utc(this.state.date[1]).startOf('day').diff(moment.utc(this.state.date[0]).startOf('day'), 'days') : 1
            // });

            // this.getDatesLabels();
            // this.getAllChildsData();
            // this.getChildUsageTime();
            // setTimeout(
            // this.getMessagesHeads();
            // GetMessages(this.state.childrens[0].id, moment.utc(this.state.date[0]).startOf('day'), moment.utc(this.state.date[1]).add(1,'days').startOf('day'), 0).then(res => {  // When respond package is with status 200
            //     console.log(res);
            // });
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    render() {
        return  (   this.props.childrens.length == 0 ? "No Childrens in app" :             
            <div>
                <Grid>
                                            <ul className="tabs-nav nav navbar-nav navbar-left">
                        </ul>
                        <Tabs defaultActiveKey={0} id="Dashboard_tabs" onSelect={this.handleTabSelect} animation={true}>
                            { this.props.childrens.map((child,index) => 
                                <Tab key={index} title={child.name} eventKey={index}  >
                                    <Row>
                                        <Dates />
                                    </Row>
                                    <Grid fluid={true} >
                                        <TopPanel childIndex={index} />
                                    </Grid>
                                    {/* {this.state.childrensData !== undefined && this.state.childrensData[index] !== undefined && this.state.childrensData[index].abusiveChartData !== undefined && this.state.childrensData[index].messagesHeads !== undefined && this.buildTab(index)} */}
                                    {/* {this.props.childrens[index].id} */}
                                </Tab>)
                            }
                        </Tabs>
                        <BottomPanel />
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setChildrens: (val) => {
            dispatch({
                type: "SET_CHILDRENS",
                value: val
            });
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
