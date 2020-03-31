import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import MapMenu from '../components/MapMenu';

const mapStyles = {
  width: '100%',
  height: '90%'
};

class MainMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount(){
    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
         this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
      );
    }
  }

  render() {

    return (
            <body>
              
              <div>
                <MapMenu></MapMenu>
              </div>

              <div>
                <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={this.props.center}
                  center={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                >
                  <Marker
                    position={{lat: this.state.lat, lng: this.state.lng}}
                    name="Current Location"
                  ></Marker>
                </Map>
              </div>

            </body>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
  })(MainMap);