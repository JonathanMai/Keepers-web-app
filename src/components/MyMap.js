import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { compose, withProps, withStateHandlers } from "recompose";
import { GetLocation } from '../serviceAPI';
import moment from 'moment';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxyu4XFYitntVnXBSTRK0N3OCV2cj1HoY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `26vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(() => ({
    isOpen: false,
    clicked: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
    onClikedToggle: ({ clicked, isOpen }) => () => ({
      clicked: !clicked,
      isOpen: true,
    }),
    onCloseToggle: ({ clicked, isOpen }) => () => ({
      clicked: false,
      isOpen: false,
    })
  }),
)(props => {
  return (
  <GoogleMap defaultZoom={6} defaultCenter={{ lat: 31.755308, lng: 35.209049}}>
      {
          props.children.map((element, index) => {
          return (<Marker key={element.childId} onMouseOut={!props.clicked ? props.onToggleOpen : null} onMouseOver={!props.clicked ? props.onToggleOpen : null} onClick={props.onClikedToggle} position={{ lat: element.latitude, lng: element.longitude }} >
          {
            props.isOpen && 
            <InfoWindow onCloseClick={props.onCloseToggle}>
              <ChildName name={props.names[index].name}/>
            </InfoWindow>
          }
          </Marker> );
        })  
      }
  </GoogleMap>
)});

class ChildName extends Component {
  render() {
    return(<div>{this.props.name}</div>);
  }
}


class MyMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kidsLocation: []
    };
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
		if(res.data.length === 0) {
			// this.getCurrentLocation(id, from.subtract(3, 'hours'))
			return -1;
		}
		if(res.data === -1 && res.data === undefined) {
		}
		else {
			let kidsLocation = this.state.kidsLocation;
			let markers = this.state.markers;
			kidsLocation[index] = res.data[0];
			let newLocation = {
				lat: res.data[0].latitude,
				lon: res.data[0].longitude
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
  
  getChildNameById(id) {

  }

  render() {
    return (
      // Important! Always set the container height explicitly
      this.state.kidsLocation[0] != undefined && 
        <MyMapComponent names={this.props.childrens} children={this.state.kidsLocation}/>
        // <GoogleMapReact 
          
        //   // Map position
        //   style={{position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     height: '-webkit-fill-available'}
        //   }
        //   bootstrapURLKeys={{ key: "AIzaSyDxyu4XFYitntVnXBSTRK0N3OCV2cj1HoY" }}
        //   defaultCenter={this.props.center}
        //   defaultZoom={this.props.zoom}
        //   height='-webkit-fill-available'
        // >
        //   <AnyReactComponent
        //     lat={59.955413}
        //     lng={30.337844}
        //     text={'Kreyser Avrora'}
        //   />
        // </GoogleMapReact>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      childrens: state.dashboardInfo.childrens
      // startDate: state.dashboardInfo.startDate,
      // range: state.dashboardInfo.datesRange,
      // isOneDay: state.dashboardInfo.isOneDay
  };
};

export default connect(mapStateToProps)(MyMap);
