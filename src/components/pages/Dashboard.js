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
                <Grid fluid={true}>
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