import React, { Component } from 'react';
import { GetAllChildren } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, Row } from 'react-bootstrap';
import TopPanel from '../panels/TopPanel';
import BottomPanel from '../panels/BottomPanel';
import Dates from '../panels/Dates';
import '../../styles/dashboard.css';
import '../../styles/card.css';
import '../../styles/footer.css';

class Dashboard extends Component {
    constructor(props){
        super(props);
        props.changePanelColor("rgba(37, 185, 204, 0.45)");
        props.setShowLogoutIcon(true);
    }

    handleTabSelect(key) {
        this.props.setCurrTab(key);
        let zoom;
        this.props.zoom === 15 ? zoom = 16 : zoom = 15; 
        this.props.setZoom(zoom);
        // console.log("ZOOM", this.props.zoom);
        // console.log(this.props.setCurrTab);
    }

    componentWillMount() {
        GetAllChildren().then(res => {  // When respond package is with status 200
            let childrens = [];
            let count = 0;
            res.data.map(obj => {
                childrens.push(obj);
            });

            this.props.setChildrens(childrens);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.response);
        });
    }


    render() {
        return  (   this.props.childrens.length == 0 ? this.props.currLang.children_not_found :             
            <div>
                <Grid fluid={true} className="grid">
                        <ul className="tabs-nav nav navbar-nav navbar-left" >
                        </ul>
                        <Tabs defaultActiveKey={0} id="Dashboard_tabs" border={0} onSelect={this.handleTabSelect.bind(this)} animation={true} >
                            { this.props.childrens.map((child,index) => 
                                <Tab key={index} title={child.name} eventKey={index} className="card">
                                    <Row padding={'0px 10px 0px 10px'}>
                                        <Dates />
                                    </Row>
                                    <Grid fluid={true} >
                                        <TopPanel childIndex={index} />
                                    </Grid>
                                </Tab>)
                            }
                            <BottomPanel  />
                        </Tabs>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        zoom: state.dashboardInfo.defaultZoom,
        currLang: state.lang.currLang
    };
};

const mapDispatchToProps = (dispatch) => {
    // if(dispatch.)
    return {
        setChildrens: (val) => {    
            dispatch({
                type: "SET_CHILDRENS",
                value: val
            });
        },
        setCurrTab: (val) => {
            dispatch({
                type: "SET_TAB",
                value: val
            });
        },
        setZoom: (val) => {
            dispatch({
                type: "SET_ZOOM",
                value: val
            });
        },
        changePanelColor: (val) => {
            dispatch({
                type: "CHANGE_PANEL_COLOR",
                value: val
            });
        },
        setShowLogoutIcon: (val) => {
            dispatch({
                type: "SET_ICON_VISIBILITY",
                value: val
            });
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);