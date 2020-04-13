import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import { Layout, Menu, Dropdown } from 'antd';
import {
  UnorderedListOutlined,
  StarOutlined,
  SettingOutlined,
  StarTwoTone
} from '@ant-design/icons';

  // TODO:
  //
  // Design:
  //
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

const { Sider } = Layout;
const { SubMenu } = Menu;

const contextMenu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

class MapMenu extends Component {

  constructor(props){
    super(props);

    this.state = {
      theme: 'dark',
      current: '1',
      collapsed: false,
      wikiInfo: [{
        name: '',
        coordinates: {
          lat: 0,
          lng: 0
        },
        url: ''
      }]
    };

    this.onMenuClick = this.onMenuClick.bind(this)
    this.setState({wikiInfo: this.props.articleInfo})
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  onMenuClick = (props, menu, e) => {
    console.log(this.props)
    var index = props.key
    if (this.props.expandedMenus.includes(index))
    {
      for(var i = this.props.expandedMenus.length - 1; i >= 0; i--) {
        if(this.props.expandedMenus[i] === index) {
            this.props.expandedMenus.splice(i, 1);
        }
      }
      this.setState({state: this.state})
    }
    else
    {
      this.props.expandedMenus.push(index)
      this.setState({state: this.state})
    }
  }

  render() {
    var allArticles = [];
    
    for (let place of this.props.articleInfo)
    {
      var articleChildren = []
      for (let article of place.articles)
      {
        articleChildren.push(
              <Menu.Item key={article.timestamp} style={{ textAlign: "left"}} onClick={()=> 
                  {
                    console.log(article.timestamp)
                    window.open(article.timestamp, "_blank")
                  }
                } onContextMenu={(e)=>{
                  e.preventDefault()
                  console.log(article)
                  this.props.addFavoritePrompt(article)
                  }}>{article.title}
              </Menu.Item>
        )
      } 
      if (place.articles.length == 0)
      {
        articleChildren.push(
          <Menu.Item key={999} style={{ textAlign: "left"}}>No Articles Found</Menu.Item>
        )
      }
      console.log("CREATING SUBMENU FOR", place.placeName, "AT INDEX", place.index)
      allArticles.push(<SubMenu 
                          key = {place.index}
                          onTitleClick = { this.onMenuClick }
                          title={
                            <span>
                              <UnorderedListOutlined/>
                              <span>{place.placeName}</span>
                            </span>
                          }
                          style={{ textAlign: "left"}}
                          children={articleChildren}
                          >
                        </SubMenu>)
    }
    console.log(allArticles)
    console.log(this.props.expandedMenus)
    return (
        <Sider collapsed={this.state.collapsed} width={300} style={{ overflow: 'auto',height: '100vh', position: 'fixed',}} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultOpenKeys={this.props.expandedMenus} openKeys={this.props.expandedMenus} mode="inline">
        <SubMenu
            key="sub1"
            title={
              <span>
                <StarOutlined/>
                <span>Favorites</span>
              </span>
            }
            onTitleClick = { this.onMenuClick }
            style={{ textAlign: "left"}}
          >
            <Menu.Item key="999" 
            style={{ textAlign: "left" }}>Tom</Menu.Item>
            <Menu.Item key="456" 
            style={{ textAlign: "left" }}>Bill</Menu.Item>
            <Menu.Item key="123" 
            style={{ textAlign: "left" }}>Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <UnorderedListOutlined/>
                <span >All Articles</span>
              </span>
            }
            onTitleClick = { this.onMenuClick }
            style={{ textAlign: "left"}}
            children={allArticles}
          >
          {/* <Menu.Item key="1">Tom</Menu.Item>
          <Menu.Item key="2">Bill</Menu.Item>
          <Menu.Item key="3">Alex</Menu.Item> */}
          
        </SubMenu>
            <Menu.Item key="54656" style={{ textAlign: "left"}}>
                <span>
                    <SettingOutlined/>
                    <span>Options</span>
                </span>
            </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default MapMenu;