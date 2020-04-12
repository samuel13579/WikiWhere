import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import '../components/Styles/MainMapStyle.css';
import 'antd/dist/antd.css';
import MapMenu from '../components/MapMenu';
import MapHeader from '../components/MapHeader';
import MapExport from '../components/MapExport';

const { Content, Footer } = Layout;

class MainMap extends Component {

  constructor(props){
    super(props);

    this.state = {

      wikiInfo: [],
      map_coords: [],
      expandedMenus: ['sub2'],
      wikiDataLoaded: false
    }

    this.onCollapse = this.onCollapse.bind(this);
    this.apiHasLoaded = this.apiHasLoaded.bind(this);
    this.wikiInfoRecieived = this.wikiInfoRecieived.bind(this);
    this.wikiInfoFinishedLoading = this.wikiInfoFinishedLoading.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.accordionIn = this.accordionIn.bind(this);
  }

  wikiInfoRecieived(info){
    console.log("Inside of wiki info recienved");
    this.setState({wikiInfo : info});
    console.log(this.state.wikiInfo);
  }

  wikiInfoFinishedLoading() {
    this.setState({wikiDataLoaded: true});
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  accordionIn(index)
  {
    console.log("FUCK", this.state.expandedMenus)
    for(var i = this.state.expandedMenus.length - 1; i >= 0; i--) {
      if(this.state.expandedMenus[i] === index) {
          this.state.expandedMenus.splice(i, 1);
      }
    }
    console.log("FUCK", this.state.expandedMenus)
    this.setState({expandedMenus: this.state.expandedMenus})
  }

  expandMenu(index)
  {
    console.log("think", this.state.expandedMenus)
    this.state.expandedMenus.push(index.toString())
    this.setState({expandedMenus: this.state.expandedMenus})
  }

  apiHasLoaded = (map, mapsApi) => {
    this.setState({
      mapsApi,
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      directionService: new mapsApi.DirectionsService(),
      geoCoderService: new mapsApi.Geocoder(),
      singaporeLatLng: new mapsApi.LatLng(1.3521, 103.8198)
    });
  }

  render() {
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MapMenu articleInfo={this.state.wikiInfo} expandedMenus={this.state.expandedMenus}/>
        <Layout className="site-layout">
          <MapHeader wikiDataLoaded={this.state.wikiDataLoaded}/>
          <br></br>
          <Content className="content-div" style={{ margin: '0 16px'}}>
            <MapExport wikiDataLoaded={this.wikiInfoFinishedLoading} loadWikiData={this.wikiInfoRecieived} expandMenu={this.expandMenu} loadCoords={this.coordinates}/>

                {/* <Marker
                  position={{lat: this.state.lat, lng: this.state.lng}}
                  name="Current Location"
                ></Marker> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainMap