import React, { Component } from 'react';
import { Layout, Affix } from 'antd';
import LoginHeader from '../components/LoginHeader';
import { withRouter } from 'react-router-dom';
import SignUpCredentials from '../components/SignUpCredentials';

const { Header, Content, Footer, Sider } = Layout;

class LogIn extends Component {

// TODO:
//
// Design:
// Error message for incorrect login information
// 
// API:
// Login handling
// Possible email confirmation handling? Needs looking into.

    render() {
        return(
            <Affix>
            <Layout className="site-layout">
                <Layout className="site-layout" style={{position: "absolute", width: 1300}}>
                    <LoginHeader/>
                    <Header className="site-layout-background"/>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial'}}>
                            <div className="site-layout-background" style={{ marginBottom: 440, marginRight: 45, height: 454, width: 620, textAlign: 'center'}}>
                                This will be where the title will be,
                                along with a description. This should <br/> be scrollable while
                                everything else is fixed. UPDATED.
                            </div>
                        </Content>
                </Layout>

                <Sider style={{marginTop:88, marginLeft: 660, position: "absolute"}} theme="dark" width={600}>
                    <SignUpCredentials/>
                </Sider>
            </Layout>
            </Affix>
        );
    }
}

export default withRouter(LogIn);