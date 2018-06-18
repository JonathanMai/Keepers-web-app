import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withStateHandlers } from "recompose";
import { GetLocation } from '../serviceAPI';
import markerIcon from'../assets/map/marker.png';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

var language = window.navigator.userLanguage || window.navigator.language;

// Sets the google map component.
const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `26vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYR0U9ElfuNZrQky-zecksA7NdoNQQIlo&language=${language}&region=${language}&v=3.exp&libraries=geometry,drawing,places`
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(() => ({
    isOpen: {},
    clicked: {},
  }), {
    onToggleOpen: (state) => (index) => { // when opening the marker label in map.
      let newIsOpen = Object.assign({}, state.isOpen);
      newIsOpen[index] = !state.isOpen[index]
      return { isOpen: newIsOpen }
    },
    onClikedToggle: (state) => (index) => { // open the marker label.
      let newClicked = Object.assign({}, state.clicked);
      newClicked[index] = !state.clicked[index];
      return { clicked: newClicked }
    },
    onCloseToggle: (state) => (index) => { // when closing the marker label.
      let newIsOpen = Object.assign({}, state.isOpen);
      let newClicked = Object.assign({}, state.clicked);
      newIsOpen[index] = false;
      newClicked[index] = false;
      return { isOpen: newIsOpen, clicked: newClicked };
    }
  }),
)(props => {
  return (
    <GoogleMap zoom={props.zoom} center={props.children[props.currTab] ? { lat: props.children[props.currTab].latitude + 0.001, lng: props.children[props.currTab].longitude} : { lat: 31.766572, lng: 35.200025}} >      {
          props.children[props.currTab] && 
          <Marker icon={markerIcon} onMouseOut={!props.clicked[props.currTab] ? props.onToggleOpen.bind(this, props.currTab) : null} onMouseOver={!props.clicked[props.currTab] ? props.onToggleOpen.bind(this, props.currTab) : null} onClick={props.onClikedToggle.bind(this, props.currTab)} position={{ lat: props.children[props.currTab].latitude, lng: props.children[props.currTab].longitude }} >
          {
            props.isOpen[props.currTab] && 
            <InfoWindow onCloseClick={props.onCloseToggle.bind(this, props.currTab)}>
			  <span>{props.names[props.currTab].name}</span>
            </InfoWindow>
          }
          </Marker>
        }
  </GoogleMap>
)});

class MyMap extends Component {

	componentDidUpdate() {
		if(this.props.update != undefined && !this.props.update[3]){
			this.getKidsCurrLocation();
		}
	}

	// gets all kids locations.
	getKidsCurrLocation() {
		this.props.setUpdate(3);
		setInterval(this.getKidsCurrLocation.bind(this), 60000 * 5); // sets interval - every 5 minutes checks where are the childrens.
		let kidsLocation = [];
		for(let i = 0; i < this.props.childrens.length; i++){ // iterates through each kid.
			this.getCurrentLocation(this.props.childrens[i].id, kidsLocation, i);
		}
	}
  
	// send packet to get kids current location.
	// gets the kid id and his index.
  	getCurrentLocation(id, kidsLocation, index) {
		GetLocation(id).then(res => {  // when respond package is with status 200
			if(res.data.length !== 0) { // no data from server
				kidsLocation[index] = res.data[res.data.length - 1]; // adds the new data.
			}
			this.props.setLocations(kidsLocation);
		
		}).catch(error => { // When respond package is with error status - 400 ...
			console.log(error);
		});
  	}


	render() {
		return (
		<MyMapComponent 
			zoom={this.props.defaultZoom} 
			names={this.props.childrens}
			children={this.props.kidsLocation} 
			currTab={this.props.currentTab} 
			/>  
		);
  	}
}

// variables used from redux.
const mapStateToProps = (state) => {
	return {
		childrens: state.dashboardInfo.childrens, // gets information of all childrens of the user through redux.
		kidsLocation: state.dashboardInfo.kidsLocation, // gets the kids location information from redux.
		currentTab: state.dashboardInfo.currTab, // get current tab kid.
		defaultZoom: state.dashboardInfo.defaultZoom, // get default zoom.
		update: state.dashboardInfo.updateData, // get update data, to see if need to update the map.
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUpdate: (val) => {
            dispatch({
                type: "SET_UPDATE",
                value: val
            });
		},
		setLocations: (val) => {
            dispatch({
                type: "SET_LOCATIONS",
                value: val
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
