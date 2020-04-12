import React, { Component } from 'react';
import { Layout, Typography } from 'antd';
import LoginHeader from '../components/LoginHeader';
import { withRouter } from 'react-router-dom';
import SignUpCredentials from '../components/SignUpCredentials';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Text } = Typography;

class LogIn extends Component {

    render() {
        return(
            <div style={{marginTop: 0, height: "700px"}}>
                <LoginHeader/>
                    <Layout className="layout" style={{marginTop: 0}}>
                        <Content className="content-container" style={{ margin: '24px 16px 0', overflow: 'initial'}}>
                            <div className="content-div" style={{ textAlign: 'center', width: "1250px", height: "600px"}}>
                                <Title>
                                     What is WikiWhere?
                                </Title>
                                <Text style={{fontSize: 20}}>
                                    WikiWhere is a culmination of technology, utilizing Google's API
                                    services to derive <br/> user location and information on places around the user.
                                    The information on places<br/> is then sent through Wikipedia, which finds the most
                                    relevent and germaine article, and returns <br/> it as a point for the user.
                                </Text>
                                
                                
                                <Title>
                                     What does WikiWhere do?
                                </Title>
                                <br/>
                                <Text style={{fontSize: 20}}>
                                    Just as the name suggests, WikiWhere pulls in data from all around you<br/>
                                    and return relevent Wikipedia articles that you may find useful or <br></br> interesting. 
                                    Other featurs include favoriting articles you find enjoyable or finding <br/>articles related to
                                    the one you just viewed.
                                </Text>

                            </div>
                        </Content>
                    <Sider className='sidebar-layout' style={{marginTop:24, marginLeft: "1290px", position: "fixed", height: "600px", marginRight: "1%"}} theme="dark" width={600}>
                        <SignUpCredentials/>
                    </Sider>
                </Layout>
            </div>
        );
    }
}

export default withRouter(LogIn);