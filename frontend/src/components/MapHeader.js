import React, { Component } from 'react';
import { Layout, Typography, Button, Row} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Styles/MainMapStyle.css';

const { Title } = Typography;
const { Header } = Layout;

class MapHeader extends Component {

    render() {
        return(
            <div>
                <Header className="site-layout-background" style={{ padding: 10 }}>
                    <Row>
                        {/* Add some special font either through CSS or imported font */}
                        <Title style={{marginLeft: 400}}>
                            WikiWhere 
                            <Link to= "/">
                                <Button type="primary" style={{marginLeft: 315}}>Log out</Button>
                            </Link>
                        </Title>
                        {/* Add a log out methid */}
                    </Row>
                </Header>
            </div>
        )


    }
}

export default withRouter(MapHeader);