import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { compose, withProps, withStateHandlers } from "recompose";
import { GetLocation } from '../serviceAPI';
import moment from 'moment';
import markerIcon from'../assets/marker.png';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `32vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(() => ({
    isOpen: {},
    clicked: {},
  }), {
    onToggleOpen: (state) => (index) => {
      let newIsOpen = Object.assign({}, state.isOpen);
      newIsOpen[index] = !state.isOpen[index]
      return { isOpen: newIsOpen }
    },
    onClikedToggle: (state) => (index) => {
      let newClicked = Object.assign({}, state.clicked);
      newClicked[index] = !state.clicked[index];
      return { clicked: newClicked }
    },
    onCloseToggle: (state) => (index) => {
      let newIsOpen = Object.assign({}, state.isOpen);
      let newClicked = Object.assign({}, state.clicked);
      newIsOpen[index] = false;
      newClicked[index] = false;
      return { isOpen: newIsOpen, clicked: newClicked };
    }
  }),
)(props => {
  return (
    <GoogleMap zoom={props.zoom} center={props.children[props.currTab] ? { lat: props.children[props.currTab].latitude, lng: props.children[props.currTab].longitude } : { lat: 31.766572, lng: 35.200025}} >      {
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
      kidsLocation: []
    };
    setInterval(this.getKidsCurrLocation.bind(this), 60000 * 5);
    this.getKidsCurrLocation();
  }

  getKidsCurrLocation() {
		let curr =  moment().subtract(3, 'hours');

		for(let i = 0; i < this.props.childrens.length; i++){
		// while(this.getCurrentLocation(this.props.childrens[i].id,) === -1){ 
			// if(curr < moment().subtract(day)) {
			// curr = curr.subtract(1, 'day');
      let data = this.getCurrentLocation(this.props.childrens[i].id, curr.subtract(7, 'day'), i);

			// if(data === -1 && data === undefined) {
			//     i = i-1;
			// }
			// else {
			//     kidsLocation[i] = data[0];
			//     let newLocation = {
			//         lat: data[0].latitude,
			//         lon: data[0].longitude
			//     };

			//     this.setState({
			//         ...this.state,
			//         kidsLocation: kidsLocation,
			//         point: newLocation
			//   });
			// }
			// }
		// }
		}
  }
  
  getCurrentLocation(id, from, index) {
		GetLocation(id, from, moment()).then(res => {  // When respond package is with status 200
      // console.log(res)
      if(res.data.length === 0) {
			// this.getCurrentLocation(id, from.subtract(3, 'hours'))
			return -1;
		}
		if(res.data === -1 && res.data === undefined) {
		}
		else {
			let kidsLocation = this.state.kidsLocation;
			let markers = this.state.markers;
			kidsLocation[index] = res.data[res.data.length - 1];
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

		// return (res.data);
	// address:"Eshed St 11-41, Tzur Hadassah, Israel"
	// childId:291
	// dateCreated:1525548862000
	// id:61991
	// isOutlier:false
	// latitude:31.7136773
	// longitude:35.0955059


		}).catch(error => { // When respond package is with error status - 400 ...
			console.log(error);
			return -1;
		});
		// return -1
  }


  render() {
    var language = window.navigator.userLanguage || window.navigator.language;
    let url = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYR0U9ElfuNZrQky-zecksA7NdoNQQIlo&language=${language}&region=${language}&v=3.exp&libraries=geometry,drawing,places`;
    return (
      // Important! Always set the container height explicitly
      <MyMapComponent 
        zoom={this.props.defaultZoom} 
        names={this.props.childrens}
        children={this.state.kidsLocation} 
        currTab={this.props.currentTab} 
        childFocused={this.state.point} 
        googleMapURL={url} />  
    );
  }
}

const mapStateToProps = (state) => {
  return {
      childrens: state.dashboardInfo.childrens,
      currentTab: state.dashboardInfo.currTab,
      defaultZoom: state.dashboardInfo.defaultZoom,
  };
};

export default connect(mapStateToProps)(MyMap);
