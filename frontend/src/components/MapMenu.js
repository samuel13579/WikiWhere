import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  UnorderedListOutlined,
  StarOutlined,
  SettingOutlined
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
      wikiInfo: [{
        name: '',
        coordinates: {
          lat: 0,
          lng: 0
        },
        url: ''
      }],
      locations: [
        {
          name: "John's Fat Cock",
          articles: [
            {
              pageid: 123432,
              title: "John's Fat Cock - A Measurement"
            },
            {
              pageid: 123323,
              title: "The Study of Porn"
            },
            {
              pageid: 123645,
              title: "Fat Cocks"
            }
          ]
        },
        {
          name: "Mason's Tight Boypussy",
          articles: [
            {
              pageid: 8906,
              title: "Mason's Tiny Vaginy"
            },
            {
              pageid: 7543,
              title: "The Study of Porn"
            },
            {
              pageid: 7856,
              title: "Tiny Peepees"
            }
          ]
        },
        {
          name: "Maurice Laflamme",
          articles: [
            {
              pageid: 76755,
              title: "Slayer of CORS"
            },
            {
              pageid: 12434,
              title: "CORS and its downfall"
            },
            {
              pageid: 145435,
              title: "Cum"
            }
          ]
        },
        {
          name: "Beans",
          articles: [
            {
              pageid: 52345,
              title: "Beans"
            },
            {
              pageid: 2134,
              title: "Turkey"
            },
            {
              pageid: 34,
              title: "Epic Cock"
            }
          ]
        }
      ]
    };

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

  render() {
    var allArticles = [];
    // this.setState({wikiInfo: this.props.articleInfo})

    // console.log(this.props.articleInfo.length);

    // console.log("The artciles in the side menu: ");
    // console.log(this.props.articleInfo);

    // console.log("The wiki info state is: ");
    // console.log(this.state.wikiInfo);
    
    for (let place of this.props.articleInfo)
    {
      var articleChildren = []
      for (let article in place.articles)
      {
        articleChildren.push(<Menu.Item key={article.pageid} style={{ textAlign: "left" }}>{article.title}</Menu.Item>)
      }
      allArticles.push(<SubMenu 
                          title={
                            <span>
                              <UnorderedListOutlined/>
                              <span>{place.placeName}</span>
                            </span>
                          }
                          style={{ textAlign: "left" }}
                          children={articleChildren}
                          >
                        </SubMenu>)
    }
    return (
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu
            key="sub1"
            title={
              <span>
                <StarOutlined/>
                <span>Favorites</span>
              </span>
            }
            style={{ textAlign: "left" }}
          >
            <Menu.Item key="1" 
            style={{ textAlign: "left" }}>Tom</Menu.Item>
            <Menu.Item key="2" 
            style={{ textAlign: "left" }}>Bill</Menu.Item>
            <Menu.Item key="3" 
            style={{ textAlign: "left" }}>Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <UnorderedListOutlined/>
                <span>All Articles</span>
              </span>
            }
            style={{ textAlign: "left" }}
            children={allArticles}
          >
          {/* <Menu.Item key="1">Tom</Menu.Item>
          <Menu.Item key="2">Bill</Menu.Item>
          <Menu.Item key="3">Alex</Menu.Item> */}
          
        </SubMenu>
            <Menu.Item key="10" style={{ textAlign: "left" }}>
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