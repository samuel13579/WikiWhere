import React, { Component } from 'react';
import { Layout, Button, Modal } from 'antd';
import '../components/Styles/MainMapStyle.css';
import 'antd/dist/antd.css';
import MapMenu from '../components/MapMenu';
import MapHeader from '../components/MapHeader';
import MapExport from '../components/MapExport';
import axios from 'axios';

const { Content, Footer } = Layout;

class MainMap extends Component {

  constructor(props){
    super(props);

    this.state = {

      wikiInfo: [],
      map_coords: [],
      expandedMenus: ['sub2'],
      wikiDataLoaded: false,
      userlocation: this.props.userlocation,
      visible: false,
      favArticle: ''
    }

    this.onCollapse = this.onCollapse.bind(this);
    this.apiHasLoaded = this.apiHasLoaded.bind(this);
    this.wikiInfoRecieived = this.wikiInfoRecieived.bind(this);
    this.wikiInfoFinishedLoading = this.wikiInfoFinishedLoading.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.addFavoritePrompt = this.addFavoritePrompt.bind(this)
    this.cancel = this.cancel.bind(this);
    this.accept = this.accept.bind(this);
  }

  wikiInfoRecieived(info){
    console.log("Inside of wiki info recienved");
    this.setState({wikiInfo : info});
    console.log(this.state.wikiInfo);
  }

  addFavoritePrompt(article)
  {
    this.setState({
      visible: true,
      favArticle: article
    })
  }

  wikiInfoFinishedLoading(value) {
    if (value === 1)
      this.setState({wikiDataLoaded: true});
    else
      this.setState({wikiDataLoaded: false})
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

  cancel(e){
    this.setState({
      visible: false
    })
  }

  async accept(){

    this.setState({
      visible:false
    })
    var res;
    var token = localStorage.getItem("token");
    //var token = this.state.token;
    console.log({ headers: { Authorization: `Bearer ${token}` } })
    try {
      //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZTE1NmU0ZDQxMWQxOTgyNWFiOGRmIn0sImlhdCI6MTU4NjM2OTkwMiwiZXhwIjoxNTg2Mzc5OTAyfQ.HibBVgUPLZiODtLZrSskyen4B-y4ko0JJfAIar9dc-k"
      //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZTE1NmU0ZDQxMWQxOTgyNWFiOGRmIn0sImlhdCI6MTU4NjM2OTkwMiwiZXhwIjoxNTg2Mzc5OTAyfQ.HibBVgUPLZiODtLZrSskyen4B-y4ko0JJfAIar9dc-k"
      //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZTE1NmU0ZDQxMWQxOTgyNWFiOGRmIn0sImlhdCI6MTU4NjM2OTkwMiwiZXhwIjoxNTg2Mzc5OTAyfQ.HibBVgUPLZiODtLZrSskyen4B-y4ko0JJfAIar9dc-k"
    res = await axios.get("https://wiki-where.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } });
    console.log(res.data);
  }catch(err){
    console.log(err);
  }

    const details = {
      userid: res.data._id,
      favorite: this.state.favArticle
    }
    try{
      let ress = await axios.post("https://wiki-where.herokuapp.com/api/wiki/wiki/add", details);
      console.log(ress);
    } catch(err) {
      console.log(err);
    }

    console.log("Done")
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
        <MapMenu articleInfo={this.state.wikiInfo} expandedMenus={this.state.expandedMenus} addFavoritePrompt = {this.addFavoritePrompt}/>
        <Layout className="site-layout">
          <MapHeader wikiDataLoaded={this.state.wikiDataLoaded}/>
          <br></br>
          <Content className="content-div" style={{ width: "81%", marginLeft: "330px"}}>
            <MapExport userlocation={this.state.userlocation} wikiDataLoaded={this.wikiInfoFinishedLoading} loadWikiData={this.wikiInfoRecieived} expandMenu={this.expandMenu} loadCoords={this.coordinates}/>
            <Modal
              title="Add to favorites"
              visible={this.state.visible}
              onOk={this.accept}
              onCancel={this.cancel}
              footer={[
                <div>
                  <Button key="no" onClick={this.cancel}>
                    No
                  </Button>
                  <Button key="yes" onClick={this.accept}>
                    Yes
                  </Button>
                </div>
              ]}>
              <p>Would you like to add this article to your favorites?</p>
              </Modal>
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