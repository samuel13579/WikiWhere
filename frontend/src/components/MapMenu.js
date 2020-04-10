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


const AllArticles =  (props) => {
  var j = 4;
  var allArticleComponentList = []
  props.locations.map (i => {
    j++;
    console.log(j);
    allArticleComponentList.push(
    <div>
      <Menu.Item key={j}>{i}</Menu.Item> 
    </div>);
  })
  
  return (allArticleComponentList);
}

class MapMenu extends Component {
  state = {
    theme: 'dark',
    current: '1',
    collapsed: false,
    locations: [1, 2, 3]
  };

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

    var j = 4;

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
          >
            <Menu.Item key="1">Tom</Menu.Item>
            <Menu.Item key="2">Bill</Menu.Item>
            <Menu.Item key="3">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <UnorderedListOutlined/>
                <span>All Articles</span>
              </span>
            }
            children={AllArticles}
          >
          {/* <Menu.Item key="1">Tom</Menu.Item>
          <Menu.Item key="2">Bill</Menu.Item>
          <Menu.Item key="3">Alex</Menu.Item> */}
          
        </SubMenu>
            <Menu.Item key="10">
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