import React, { Component } from 'react';
import { Layout } from 'antd';
import LoginCredentials from './LogInCredentials';
import { withRouter } from 'react-router-dom';

const { Header } = Layout;

class LoginHeader extends Component {

    render() {
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <LoginCredentials/>
            </Header>
        );
    }
}

export default withRouter(LoginHeader);