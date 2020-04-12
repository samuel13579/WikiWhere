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

  expandMenu(index)
  {
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
      <Layout style={{ minHeight: '100vh', position: 'fixed', width: '1910px'}}>
        <MapMenu articleInfo={this.state.wikiInfo} expandedMenus={this.state.expandedMenus}/>
        <Layout className="site-layout">
          <MapHeader wikiDataLoaded={this.state.wikiDataLoaded}/>
          <br></br>
          <Content className="content-div" style={{ width: "81%", marginLeft: "330px"}}>
            <MapExport wikiDataLoaded={this.wikiInfoFinishedLoading} loadWikiData={this.wikiInfoRecieived} expandMenu={this.expandMenu} loadCoords={this.coordinates}/>

                {/* <Marker
                  position={{lat: this.state.lat, lng: this.state.lng}}
                  name="Current Location"
                ></Marker> */}
          </Content>
          <Footer style={{ textAlign: 'center', marginLeft: "300px"}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainMap