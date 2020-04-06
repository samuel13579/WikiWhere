import React, { Component } from 'react';
import { Layout } from 'antd';
import LoginHeader from '../components/LoginHeader';
import { withRouter } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

class LogIn extends Component {

// TODO:
//
// Design:
// Make in the stlye of Facebook maybe.
// Right side can be sign up page, eliminates need for another file,
// just make sure to atomize it
//
// API:
// Login handling
// Sign up handling
// Possible email confirmation handling? Needs looking into.

    render() {
        return(
            <Layout>
                <LoginHeader/>
                <Layout className="site-layout" style={{ marginRight: 400 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                                This will be where the title will be,
                                along with a description. This should be scrollable while
                                everything else is fixed.
                            </div>
                        </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(LogIn);