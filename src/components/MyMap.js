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
              <ChildName name={props.names[props.currTab].name}/>
            </InfoWindow>
          }
          </Marker>
        }
  </GoogleMap>
)});

class ChildName extends Component {
  render() {
    return(<span>{this.props.name}</span>);
  }
}

class MyMap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstTime: true, // boolean that indicates if location data of all childrens was called.
			kidsLocation: [], // holds all kids locations.
			point: {} // the curr kid tab location. 
		};
	}

	componentDidUpdate() {
		if(this.state.firstTime && this.props.update != undefined && !this.props.update[3]){
			this.getKidsCurrLocation();
		}
	}

	// gets all kids locations.
	getKidsCurrLocation() {
		this.setState({
			...this.state,
			firstTime: false // got data - not first time any more, dependent on interval.
		});
		setInterval(this.getKidsCurrLocation.bind(this), 60000 * 5); // sets interval - every 5 minutes checks where are the childrens.
		for(let i = 0; i < this.props.childrens.length; i++){ // iterates through each kid.
			this.getCurrentLocation(this.props.childrens[i].id, i);
		}
	}
  
	// send packet to get kids current location.
	// gets the kid id and his index.
  	getCurrentLocation(id, index) {
		GetLocation(id).then(res => {  // when respond package is with status 200
			if(res.data.length === 0) { // no data from server
				return -1;
			}
			else {
				let kidsLocation = this.state.kidsLocation;
				kidsLocation[index] = res.data[res.data.length - 1]; // adds the new data.
				let newLocation = {
					lat: res.data[res.data.length - 1].latitude,
					lon: res.data[res.data.length - 1].longitude
				};
				this.setState({
					...this.state,
					kidsLocation: kidsLocation,
					point: newLocation
				});
    		}
		}).catch(error => { // When respond package is with error status - 400 ...
			console.log(error);
			return -1;
		});
  	}


	render() {
		return (
		<MyMapComponent 
			zoom={this.props.defaultZoom} 
			names={this.props.childrens}
			children={this.state.kidsLocation} 
			currTab={this.props.currentTab} 
			childFocused={this.state.point} 
			/>  
		);
  	}
}

// variables used from redux.
const mapStateToProps = (state) => {
	return {
		childrens: state.dashboardInfo.childrens, // gets information of all childrens of the user through redux.
		currentTab: state.dashboardInfo.currTab, // get current tab kid.
		defaultZoom: state.dashboardInfo.defaultZoom, // get default zoom.
		update: state.dashboardInfo.updateData, // get update data, to see if need to update the map.
	};
};

export default connect(mapStateToProps)(MyMap);
