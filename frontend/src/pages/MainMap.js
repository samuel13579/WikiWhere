import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import '../components/Styles/MainMapStyle.css';
import 'antd/dist/antd.css';
import MapMenu from '../components/MapMenu';
import MapHeader from '../components/MapHeader';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const mapStyles = {
  width: '78%',
  height: '70%',
};

class MainMap extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      lat: 0,
      lng: 0
    }
  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              }
          );
      });
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MapMenu/>
        <Layout className="site-layout">
          <MapHeader/>
          <br></br>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
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
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCaXl8zW54lcJjxWBjbTWn4I1vPcXkPeyk'
  })(MainMap);