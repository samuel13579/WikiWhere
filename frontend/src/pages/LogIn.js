import React, { Component } from 'react';
import { Layout } from 'antd';
import LoginHeader from '../components/LoginHeader';
import { withRouter } from 'react-router-dom';
import SignUpCredentials from '../components/SignUpCredentials';

const { Header, Content, Footer, Sider } = Layout;

class LogIn extends Component {

// TODO:
//
// Design:
// Error message for incorrect login information
// Error message for incorrect/already taken information for sign up
// 
// API:
// Login handling
// Sign up handling
// Possible email confirmation handling? Needs looking into.

    render() {
        return(
            <Layout>
                <Layout className="site-layout">
                    <LoginHeader/>
                    <Header className="site-layout-background"/>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center'}}>
                                This will be where the title will be,
                                along with a description. This should be scrollable while
                                everything else is fixed.
                            </div>
                        </Content>
                </Layout>
                <Sider style={{marginTop:86, marginRight:10}} theme="dark" width={600}>
                    <SignUpCredentials/>
                </Sider>
            </Layout>
        );
    }
}

export default withRouter(LogIn);