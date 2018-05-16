
import React, { Component } from 'react';
import { GetAllChildren } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import TopPanel from '../panels/TopPanel';
import BottomPanel from '../panels/BottomPanel';
import Dates from '../panels/Dates';
import '../../styles/card.css';

class Dashboard extends Component {
    componentWillMount() {
        GetAllChildren().then(res => {  // When respond package is with status 200
            var childrens = [];
            res.data.map(obj => {childrens.push(obj)});
            this.props.setChildrens(childrens);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    render() {
        return  (   this.props.childrens.length == 0 ? "No Childrens in app" :             
            <div>
                <Grid fluid={false} style={{marginBottom: 20 + 'px' }}>
                        <ul className="tabs-nav nav navbar-nav navbar-left">
                        </ul>
                        <Tabs defaultActiveKey={0} id="Dashboard_tabs" onSelect={this.handleTabSelect} animation={true}>
                            { this.props.childrens.map((child,index) => 
                                <Tab key={index} title={child.name} eventKey={index} className="card">
                                    <Row>
                                        <Dates />
                                    </Row>
                                    <Grid fluid={true} >
                                        <TopPanel childIndex={index} />
                                    </Grid>
                                </Tab>)
                            }
                        </Tabs>
                        <BottomPanel/>
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
