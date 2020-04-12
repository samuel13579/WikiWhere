import React, { Component } from 'react';
import { Layout, Typography } from 'antd';
import LoginCredentials from './LogInCredentials';
import { withRouter } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

class LoginHeader extends Component {

    render() {
        return(
            <Header className="site-layout-background" style={{height: 80}}>
                <Title style={{ color: "white", position: 'absolute', marginTop: "25px"}}>
                    WikiWhere 
                </Title>
                <LoginCredentials/>
            </Header>
        );
    }
}

export default withRouter(LoginHeader);