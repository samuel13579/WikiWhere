import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow, InfoBox } from 'google-maps-react';
import { Button } from 'antd';
import {
  StarTwoTone
} from '@ant-design/icons';
import axios from 'axios';

const mapStyles = {
  width: '79%',
  height: '79%',
  left: '20px',
  top: '20px'
};

var wikiMarker = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Light_Blue_Circle.svg'
}

class MapExport extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      userlocation: this.props.userlocation,

      radius: 2000,
      places_list: [],
      places_names: [],
      places_coord: [],

      wikiPages: [],
      wikiArticles: [],
      wikiMapNames: [],

      markerList: [],
      articlesAndPlaces: [],

      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,

      mapVisible: false,
    }

    this.fetchNearestPlacesFromGoogle = this.fetchNearestPlacesFromGoogle.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.returnUrl = this.returnUrl.bind(this);
    this.favoriteClick = this.favoriteClick.bind(this);
    this.refreshFavorites = this.refreshFavorites.bind(this)
  }

  // async componentDidMount(){
  //   if (navigator.geolocation) {
  //     await navigator.geolocation.getCurrentPosition(async (position) => {
  //           await this.setState({
  //                   userlocation: {
  //                   lat: position.coords.latitude,
  //                   lng: position.coords.longitude
  //                   }
  //           });
  //     });
  //   }
  // }

  sleep(seconds) 
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }

  fetchNearestPlacesFromGoogle = async (props) => {

    // console.log("Yessor")

    // if (navigator.geolocation) {
    //   await navigator.geolocation.getCurrentPosition(async (position) => {
    //         await this.setState({
    //                 userlocation: {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //                 }
    //         });
    //   });
    // }
    var value = 0
    this.props.wikiDataLoaded(value);
    console.log("SEARCHING AT LOCATION: ")
    console.log(this.state.userlocation);

    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
  
    var emptyShit = []
    this.setState({places_coord: emptyShit})
    this.setState({places_names: emptyShit})

    const proxyurl = "https://humongo-brain.herokuapp.com/";
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

          this.state.places_coord.push(coordinate);
          this.state.places_names.push(googlePlace.name);
  
          places.push(place);
        }
        this.setState({
          places_list: places
        })
        this.getWikiArticles(this.state.places_list, props)
        this.refreshFavorites()
        //if (next_page_token != '')
        //{
        //  this.sleep(2);
        //  this.findNextPage(next_page_token, this.state.places_list, props);
        //}
      })
      .catch(error => {
        console.log(error);
      });
    }

  async refreshFavorites()
  {
    var res;
    var token = localStorage.getItem("token");
    try{
      console.log(token)
      res = await axios.get("https://wiki-where.herokuapp.com/api/wiki/wiki/get", { headers: { Authorization: `Bearer ${token}` }});
      console.log(res);
    } 
    catch(err) {
      console.log(err);
    }
    this.props.loadFavorites(res.data)
  }

  findNextPage(next_page_token, places, props)
  {
    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
    var next_next_page_token = ''
    const proxyurl = "https://humongo-brain.herokuapp.com/";
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

          this.state.places_coord.push(coordinate);
          this.state.places_names.push(googlePlace.name);
    
          places.push(place);
        }
        this.setState({
          places_list: places
        })
        if (next_next_page_token != '')
        {
          this.sleep(1.5)
          this.thisFunctionExistsPrimarilyDueToActualAutism(next_next_page_token, this.state.places_list, props)
        }
      })
    .catch(error => {
      console.log(error);
    });
  }

  thisFunctionExistsPrimarilyDueToActualAutism(next_page_token, places, props)
  {
    const latitude = this.state.userlocation.lat // you can update it with user's latitude & Longitude
    const longitude = this.state.userlocation.lng
    let radMetter = this.state.radius // Search withing 2 KM radius
    var next_next_page_token = ''
    const proxyurl = "https://humongo-brain.herokuapp.com/";
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

          this.state.places_coord.push(coordinate);
          this.state.places_names.push(googlePlace.name);
    
          places.push(place);
        }
        this.setState({
          places_list: places
        })
        this.getWikiArticles(this.state.places_list, props)
      })
    .catch(error => {
      console.log(error);
    });
  }

  async getWikiArticles(places, props)
  {
    var emptyShit = []
    this.setState({wikiPages: emptyShit})
    console.log(places)
    var url = ''
    for (let place of places)
    {
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
            var object = [
              {
                coordinate: place.coordinate,
                placeName: place.placeName,
                articles: newres.query.search
              }
            ]
            this.state.wikiPages.push(object);
          })
          .catch(error => {
            console.log(error)
          })
        }
        else
        {
          var object = [
            {
              coordinate: place.coordinate,
              placeName: place.placeName,
              articles: res.query.search
            }
          ]
          this.state.wikiPages.push(object); 
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    this.getTheLinks(props)
  }

  async getTheLinks(props)
  {
    this.setState({wikiPages: this.state.wikiPages})
    var emptyShit = []
    this.setState({
      articlesAndPlaces: emptyShit,
      mapVisible: false
    })
    const placeCoords = []
    const articlesAndPlaces = []
    for (var place of this.state.wikiPages)
    {
      var articleArray = []
      articleArray['placeName'] = place[0].placeName
      articleArray['articles'] = []
      for (var article of place[0].articles)
      {
        var url = "https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=" + article.pageid + "&inprop=url&format=json&origin=*";
        let response = await fetch(url);
        let data = await response.json();

        if (place[0].placeName == "Buying & selling real pure gold shop")
        {
          console.log(place[0])
          
          console.log(article)
        }
        article['placeLocation'] = place[0].coordinate
        article['placeName'] = place[0].placeName  
        if (place[0].placeName == "Buying & selling real pure gold shop")
        {
          console.log(place[0])
          
          console.log(article)
        }
        article.timestamp = data.query.pages[article.pageid.toString()].fullurl;

        articleArray['articles'].push(article)
      }
      articlesAndPlaces.push(articleArray);
      placeCoords.push(this.state.places_coord[i++]);
    }
    var i = 0
    var wikiPages = this.state.wikiPages
    for (var article of articlesAndPlaces)
    {
      article['index'] = i
      wikiPages[i]['index'] = i++
    }
    this.props.loadWikiData(articlesAndPlaces);
    var value = 1
    this.props.wikiDataLoaded(value);

    this.setState({
      articlesAndPlaces: articlesAndPlaces,
      mapVisible: true
    })

    console.log(this.state.articlesAndPlaces);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
    this.props.expandMenu(props.avaliable_index)
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onWikiLinkClicked = () => {

  }


  returnUrl(index){  
    if (this.state.articlesAndPlaces)
    {
      if (this.state.articlesAndPlaces[index])
      {
        if (this.state.articlesAndPlaces[index].articles[0])
        {
          return this.state.articlesAndPlaces[index].articles[0].timestamp;
        }
      }
    }

    return null;
  }

  favoriteClick = () => {
    console.log("Favorite clicked");
  }

  onMarkerDragEnd(coord)
  {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat, lng)
    this.state.userlocation = { lat, lng }
    this.setState({state: this.state})
  }

  //LITERALLY DO EVERYTHING OVER LMFAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  dblClickHandler()
  {
    this.fetchNearestPlacesFromGoogle(this.props)
  }

  render(){

    const AllMarkers = [];
    for (var array of this.state.wikiPages)
    {
      for (var location of array)
      {
        var placeName = location.placeName
        var index = array.index
        var coords = {
          lat: location.coordinate.latitude,
          lng: location.coordinate.longitude
        }
        AllMarkers.push(
          <Marker
            key = {index}
            position = {coords}
            name = {placeName}
            onClick = {this.onMarkerClick}
            icon={wikiMarker}
            avaliable_index={index}
            url={this.returnUrl(index)}
            >
          </Marker>
        )
      }
    }
    const myMarker = 
    <Marker
        key = {1010100}
        position={this.state.userlocation}
        draggable={true}
        onDblclick={this.fetchNearestPlacesFromGoogle}
        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
        name="Current Location"
    ></Marker>

    return(
      <Map
        id="map"
        google={this.props.google}
        onReady={this.fetchNearestPlacesFromGoogle}
        zoom={14}
        style={mapStyles}
        onClick={this.onMapClicked}
        center={this.state.userlocation}
        initialCenter={this.state.userlocation}
        visible={this.state.mapVisible}
      >
        {AllMarkers}
        {myMarker}

        {/* <Popconfirm>
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <a target="_blank" href={this.state.selectedPlace.url}>Wikipedia Article</a>
            </div>
        </Popconfirm> */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <a target="_blank" href={this.state.selectedPlace.url}>Wikipedia Article</a>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
})(MapExport);