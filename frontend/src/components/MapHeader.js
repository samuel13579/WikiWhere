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
                    <Row style={{position:"absolute"}}>
                        {/* Add some special font either through CSS or imported font */}
                        <Title style={{marginLeft: 800}}>
                            WikiWhere 
                        
                        </Title>
                            <Link to= "/">
                                <Button type="primary" size="large" style={{marginLeft: 565, marginTop: 4, position: "absolute", float: "right"}}>Log out</Button>
                            </Link>
                        {/* Add a log out methid */}
                    </Row>
                </Header>
            </div>
        )


    }
}

export default withRouter(MapHeader);               