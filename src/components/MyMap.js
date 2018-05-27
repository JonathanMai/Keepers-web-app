import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MyMap extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  constructor(props) {
    super(props);
    this.state = {
      kidsLocation: {}
    };
    this.getKidsCurrLocation();
  }

  getKidsCurrLocation() {
    for(var i = 0; i < this.props.childrens.length; i++){
      
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
        <GoogleMapReact 
          
          // Map position
          style={{position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '-webkit-fill-available'}
          }
          bootstrapURLKeys={{ key: "AIzaSyDxyu4XFYitntVnXBSTRK0N3OCV2cj1HoY" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          height='-webkit-fill-available'
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
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
