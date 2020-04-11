import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

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
      places_list: [],
      wikiPages: []
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

  sleep(seconds) 
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }

  fetchNearestPlacesFromGoogle = () => {

    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
  
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
    var next_page_token = ''
    fetch(proxyurl + url)
      .then(res => {
        return res.json()
      })
      .then(res => {
      if (res.next_page_token)
      {
        next_page_token = res.next_page_token;
      }
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
        if (next_page_token != '')
        {
          this.sleep(2);
          this.findNextPage(next_page_token, this.state.places_list);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

  findNextPage(next_page_token, places)
  {
    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
    var next_next_page_token = ''
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+ next_page_token + "&key=AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk"
    fetch(proxyurl + url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.next_page_token)
        {
          next_next_page_token = res.next_page_token;
        }
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
        if (next_next_page_token != '')
        {
          this.sleep(1.5)
          this.thisFunctionExistsPrimarilyDueToActualAutism(next_next_page_token, this.state.places_list)
        }
      })
    .catch(error => {
      console.log(error);
    });
  }

  thisFunctionExistsPrimarilyDueToActualAutism(next_page_token, places)
  {
    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
    var next_next_page_token = ''
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+ next_page_token + "&key=AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk"
    fetch(proxyurl + url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.next_page_token)
        {
          next_next_page_token = res.next_page_token;
        }
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
        this.getWikiArticles(this.state.places_list)
      })
    .catch(error => {
      console.log(error);
    });
  }

  async getWikiArticles(places)
  {
    console.log(places)
    var url = ''
    var i = -1
    for (let place of places)
    {
      i += 1
      url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + place.placeName + "%22" + place.placeName + "%22&format=json&srlimit=3&origin=*"
      await fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        // If there is no results with specific searches, return three general searches. (Can be disabled by just deleting this)
        if (res.query.search.length==0)
        {
          url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + place.placeName + "&format=json&srlimit=3&origin=*"
          fetch(url)
          .then(newres => {
            return newres.json()
          })
          .then(newres => {
            this.state.wikiPages.push(newres.query.search);
          })
          .catch(error => {
            console.log(error)
          })
        }
        else
        {
          this.state.wikiPages.push(res.query.search); 
        }
        })
      .catch(error => {
        console.log(error)
      })
    }
    this.getTheLinks()
  }

  async getTheLinks()
  {
    console.log("SHIT", this.state.wikiPages)
    var jsonshit;

    await this.state.wikiPages.forEach(async page => {
      await page.forEach(async article => {
        
        var url = "https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=" + article.pageid + "&inprop=url&format=json&origin=*";

        await fetch(url)
        .then(res => 
        {
          console.log(res);
          console.log(res.json())
        })
        .catch(error => {
          console.log(error)
        })
      }); 
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