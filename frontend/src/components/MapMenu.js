import React, {Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  UnorderedListOutlined,
  StarOutlined
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

class MapMenu extends Component {

  constructor(props){
    super(props);

    this.state = {
      theme: 'dark',
      current: '1',
      collapsed: false,
    };

    this.onMenuClick = this.onMenuClick.bind(this)
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
    var favoritesList = [];

    for (let favorite of this.props.favorites)
    {
      favoritesList.push(
              <Menu.Item key={favorite._id} style={{ textAlign: "left"}} onClick={()=> 
                {
                  console.log(favorite.favorite.articleURL)
                  window.open(favorite.favorite.articleURL, "_blank")
                }
              } onContextMenu={(e)=>{
                e.preventDefault()
                console.log(favorite)
                this.props.deleteFavoritePrompt(favorite)
                }}>{favorite.favorite.articleTitle}
            </Menu.Item>
      )
    }

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
      if (place.articles.length === 0)
      {
        articleChildren.push(
          <Menu.Item key={999} style={{ textAlign: "left"}}>No Articles Found</Menu.Item>
        )
      }
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
            children = {favoritesList}
          >
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
        </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default MapMenu;