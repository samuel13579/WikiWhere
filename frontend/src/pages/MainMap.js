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
      expandedMenus: [],
      wikiDataLoaded: false,
      userlocation: this.props.userlocation,
      visible: false,
      favArticle: '',
      favorites: [],
      selectedFavorite: {
        favorite: {
          articleTitle: ''
        }
      },
      nearbyWikiArticles: []
    }

    this.onCollapse = this.onCollapse.bind(this);
    this.apiHasLoaded = this.apiHasLoaded.bind(this);
    this.wikiInfoRecieived = this.wikiInfoRecieived.bind(this);
    this.wikiInfoFinishedLoading = this.wikiInfoFinishedLoading.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.addFavoritePrompt = this.addFavoritePrompt.bind(this)
    this.cancel = this.cancel.bind(this);
    this.accept = this.accept.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this)
    this.deleteFavoritePrompt = this.deleteFavoritePrompt.bind(this)
    this.delete = this.delete.bind(this);
    this.dontDelete = this.dontDelete.bind(this);
    this.loadNearbyArticles = this.loadNearbyArticles.bind(this);
    this.addGeotaggedFavoritePrompt = this.addGeotaggedFavoritePrompt.bind(this);
  }

  wikiInfoRecieived(info){
    this.setState({wikiInfo : info});
  }

  addFavoritePrompt(article)
  {
    this.setState({
      visible: true,
      favArticle: {
        placeName: article.placeName,
        placeLocation: {
          lat: article.placeLocation.latitude.toString(),
          lng: article.placeLocation.longitude.toString()
        },
        articleTitle: article.title,
        articleURL: article.timestamp
      }
    })
  }

  addGeotaggedFavoritePrompt(wiki)
  {
    this.setState({
      visible: true,
      favArticle: {
        placeLocation: {
          lat: wiki.coordinate.lat,
          lng: wiki.coordinate.lon
        },
        articleTitle: wiki.articleTitle,
        articleURL: wiki.url
      }
    })
  }

  loadNearbyArticles(nearbyWikiArticles)
  {
    for (let page of nearbyWikiArticles) {
      var i = 50;
      page.index = i++;
    }
    this.setState({nearbyWikiArticles: nearbyWikiArticles})
  }

  deleteFavoritePrompt(favorite)
  {
    this.setState({
      visibleDelete: true,
      selectedFavorite: favorite
    })
  }

  wikiInfoFinishedLoading(value) {
    if (value === 1)
      this.setState({wikiDataLoaded: true});
    else
      this.setState({wikiDataLoaded: false})
  }

  onCollapse = collapsed => {
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
    try {
    res = await axios.get("https://wiki-where.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } });
  }catch(err){
    console.log(err);
  }

    const details = {
      userid: res.data._id,
      favorite: this.state.favArticle
    }
    try{
      let ress = await axios.post("https://wiki-where.herokuapp.com/api/wiki/wiki/add", details);
    } catch(err) {
      console.log(err);
    }
    this.refreshFavorites();
  }

  async delete(){
    this.setState({
      visibleDelete:false
    })
    const details = {
      id: this.state.selectedFavorite._id
    }
    try{
      let ress = await axios.delete("https://wiki-where.herokuapp.com/api/wiki/wiki/" + details.id);
    } 
    catch(err) {
      console.log(err);
    }
    this.refreshFavorites();
  }

  async refreshFavorites()
  {
    var res;
    var token = localStorage.getItem("token");
    try{
      res = await axios.get("https://wiki-where.herokuapp.com/api/wiki/wiki/get", { headers: { Authorization: `Bearer ${token}` }});
    } 
    catch(err) {
      console.log(err);
    }
    this.loadFavorites(res.data)
  }

  async loadFavorites(data)
  {
    this.setState({favorites: data})
  }

  dontDelete(e){
    this.setState({
      visibleDelete: false
    })
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
        <MapMenu favorites={this.state.favorites} articleInfo={this.state.wikiInfo} nearbyWikis={this.state.nearbyWikiArticles} expandedMenus={this.state.expandedMenus} deleteFavoritePrompt = {this.deleteFavoritePrompt} addFavoritePrompt = {this.addFavoritePrompt} addGeotaggedFavoritePrompt = {this.addGeotaggedFavoritePrompt}/>
        <Layout className="site-layout">
          <MapHeader wikiDataLoaded={this.state.wikiDataLoaded}/>
          <br></br>
          <Content className="content-div" style={{ width: "81%", marginLeft: "330px"}}>
            <MapExport loadFavorites={this.loadFavorites} userlocation={this.state.userlocation} LoadNearbyArticles={ this.loadNearbyArticles } wikiDataLoaded={this.wikiInfoFinishedLoading} loadWikiData={this.wikiInfoRecieived} expandMenu={this.expandMenu} loadCoords={this.coordinates}/>
            <Modal
              title="Add to favorites"
              visible={this.state.visible}
              onOk={this.accept}
              onCancel={this.cancel}
              footer={[
                <div>
                  <Button key="yes" onClick={this.accept}>
                    Yes
                  </Button>
                  <Button key="no" onClick={this.cancel}>
                    No
                  </Button>
                </div>
              ]}>
              <p>Would you like to add [{this.state.favArticle.articleTitle}] to your favorites?</p>
              </Modal>
              <Modal
              title="Delete from Favorites"
              visible={this.state.visibleDelete}
              onOk={this.delete}
              onCancel={this.dontDelete}
              footer={[
                <div>
                  <Button key="dontDelete" onClick={this.delete}>
                    Yes
                  </Button>
                  <Button key="delete" onClick={this.dontDelete}>
                    No
                  </Button>
                </div>
              ]}>
              <p>Would you like to delete [{this.state.selectedFavorite.favorite.articleTitle}] from your favorites?</p>
              </Modal>
          </Content>
          <Footer style={{ textAlign: 'center', marginLeft: "300px"}}>Tip: Right click in the menus to add and remove favorites! Also, dragging the red marker and double clicking it will cause your location to change!</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainMap