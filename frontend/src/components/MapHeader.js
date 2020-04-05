import React, { Component } from 'react';
import { Layout, Typography, Button } from 'antd';
import 'antd/dist/antd.css';
import './Styles/MainMapStyle.css';

const { Title } = Typography;
const { Header } = Layout;

class MapHeader extends Component {

    render() {
        return(
            <div>
                <Header className="site-layout-background" style={{ padding: 10 }}>
                    {/* Add some special font either through CSS or imported font */}
                    <Title style={{marginLeft: 400}}>
                        WikiWhere 
                        <Button type="primary" style={{marginLeft: 315}}>Log out</Button>
                    </Title>
                    {/* Add a log out methid */}
                </Header>
            </div>
        )


    }
}

export default MapHeader;