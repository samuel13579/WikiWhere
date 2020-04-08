import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import UserCustomMarker from './CustomMarkers/UserCustomMarker';

const mapStyles = {
  width: '84.5%',
  height: '78%',
  left: '20px',
  top: '20px'
};

class MapExport extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      userlocation: {
        lat: 0,
        lng: 0
      },

      radius: 2000,
      places_list: []
    }

    this.fetchNearestPlacesFromGoogle = this.fetchNearestPlacesFromGoogle.bind(this);
  }

  componentDidMount(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                    userlocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    }
                });
            });
        }
    }

  fetchNearestPlacesFromGoogle = () => {

    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
  
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
  
    fetch(proxyurl + url)
      .then(res => {
        return res.json()
      })
      .then(res => {
      var places = [] // This Array WIll contain locations received from google
        for(let googlePlace of res.results) {
          var place = {}
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          }
  
          place['placeTypes'] = googlePlace.types
          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name
  
          places.push(place);
        }

        this.setState({
          places_list: places
        })

      })
      .catch(error => {
        console.log(error);
      });
      
    }

  render(){
    
    return(
      <Map
        google={this.props.google}
        onReady={this.fetchNearestPlacesFromGoogle}
        zoom={14}
        style={mapStyles}
        center={this.state.userlocation}
      >
        <Marker
            position={this.state.userlocation}
            name="Current Location"
        ></Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
})(MapExport);