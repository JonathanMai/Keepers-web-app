import React, { Component } from 'react';
import { GetAllChildren } from '../../serviceAPI';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, Row } from 'react-bootstrap';
import { WaitingModal } from '../modals/WaitingModal';
import TopPanel from '../panels/TopPanel';
import ChildrenNotFound from '../panels/ChildrenNotFound';
import BottomPanel from '../panels/BottomPanel';
import Dates from '../panels/Dates';
import '../../styles/dashboard.css';
import '../../styles/card.css';
import '../../styles/footer.css';

/*
    The dashboard component, it contain the line graphs, bar graphs, chat, choose dates,
    children tabs, google maps, battery indicator, etc...
    It is the heart of the application and from here we control everything inside it.
*/
class Dashboard extends Component {
    componentWillMount() {
        this.props.setShowLoadingModal(true);
    }
    componentDidMount() {
        if(this.props.parentId !== null) {  // if parent id is null skip
            GetAllChildren().then(res => {  // server call to get all the children from the server
                let childrens = res.data.map(obj => {       // run on each object we get from the server
                    return obj;    // push it to the child array
                });

                this.props.setChildrens(childrens); // update redux childrens
            }).catch(error => { // when respond package is with error status - 400 ...
                console.log(error.response);
            });
        }
        this.props.setShowLogoutIcon(true); // set the logout logo to be visible
        setTimeout(() => {
            this.props.setShowLoadingModal(false);
        }, 1500);

    }

    // on tab change event
    handleTabSelect(key) {
        this.props.setShowLoadingModal(true);
        this.props.setCurrTab(key); // set the current tab in redux
        let zoom;
        this.props.zoom === 15 ? zoom = 16 : zoom = 15; 
        this.props.setZoom(zoom);   // change the zoom of map component
        setTimeout(() => {
            this.props.setShowLoadingModal(false);
        }, 2000);
    } 

    render() {
        if(this.props.childrens.length === 0) {
            return <ChildrenNotFound text={this.props.currLang.children_not_found} tutorial={this.props.currLang.tutorial}/>
        }
        return  (             
            <div>
                <Grid fluid={true} className="grid">
                        <ul className="tabs-nav nav navbar-nav navbar-left"></ul>
                        <Tabs defaultActiveKey={this.props.currTab} id="Dashboard_tabs" border={0} onSelect={this.handleTabSelect.bind(this)} animation={true} mountOnEnter={false} unmountOnExit={true}>
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
                 {/* loading modal. */}
                 <WaitingModal
                    showModal={this.props.showWaitingModal} 
                />
            </div>
        );
    } 
}

// variable of redux
const mapStateToProps = (state) => {
    return {
        childrens: state.DashboardInfo.childrens,       // childrens
        zoom: state.DashboardInfo.defaultZoom,          // map zoom
        currTab: state.DashboardInfo.currTab,           // current tab of the child
        parentId: state.AccountInfo.parentId,           // parent id
        currLang: state.DisplayLanguage.currLang ,      // current application language
        showWaitingModal: state.Modal.showLoadingModal // loading modal.
    };
};

// functions of redux
const mapDispatchToProps = (dispatch) => {
    return {
        // update array of all the childrens
        setChildrens: (val) => {    
            dispatch({
                type: "SET_CHILDRENS",
                value: val
            });
        },
        // update the current tab
        setCurrTab: (val) => {
            dispatch({
                type: "SET_TAB",
                value: val
            });
        },
        // update the google maps zoom
        setZoom: (val) => {
            dispatch({
                type: "SET_ZOOM",
                value: val
            });
        },
        // update the panel color
        changePanelColor: (val) => {
            dispatch({
                type: "CHANGE_PANEL_COLOR",
                value: val
            });
        },
        // update the visibility of the logout icon
        setShowLogoutIcon: (val) => {
            dispatch({
                type: "SET_ICON_VISIBILITY",
                value: val
            });
        },
        // show/hide loading modal.
        setShowLoadingModal: (val) => {
            dispatch({
                type: "SET_SHOW_LOADING_MODAL",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);