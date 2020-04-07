import React, { Component } from 'react';
import { Layout } from 'antd';
import LoginCredentials from './LogInCredentials';
import { withRouter } from 'react-router-dom';

const { Header } = Layout;

class LoginHeader extends Component {

    render() {
        return(
            <Header className="site-layout-background">
                <LoginCredentials/>
            </Header>
        );
    }
}

export default withRouter(LoginHeader);