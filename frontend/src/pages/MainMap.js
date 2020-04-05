import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import MapMenu from '../components/MapMenu';
import ArticleList from '../components/ArticleList';
import SplitPane, { Pane } from 'react-split-pane';

const mapStyles = {
  width: '70%',
  height: '85%',
  marginLeft: 208,
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
      navigator.geolocation.getCurrentPosition((position) => {
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

  // TODO:
  //
  // Design:
  //
  // Add dark background
  // Find best side menu from antd lib
  // Fill map out on screen proportianlly (Check out 'Labels' on antd components.
  // Page should be modeled after one of those.)
  // Add a logout button at the top right
  // Possibly add something to the top left of menu bar
  // Create a custom marker for Google map user location
  // Create a custom marker for Wiki article location
  // Flesh out menu with favorites, list of all articles, and account info
  // 
  // API:
  //
  // Look into wikipedia api
  // Look into google map api not loading correct coordinates? (Happening to me)
  // Figure out how to load wiki results into google maps
  // Assist mobile

  render() {

    return (
            <body>
              <div>
                <MapMenu></MapMenu>
              </div>

            <SplitPane
              split='vertical'
            >
              <div>
                <ArticleList></ArticleList>
              </div>

              <div>
                <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
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
              </SplitPane>

            </body>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
  })(MainMap);