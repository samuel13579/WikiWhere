import React, { Component } from 'react';
import { Layout, Typography } from 'antd';
import LoginHeader from '../components/LoginHeader';
import { withRouter } from 'react-router-dom';
import SignUpCredentials from '../components/SignUpCredentials';


const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Text } = Typography;

class LogIn extends Component {

    constructor(props){
        super(props);

        this.getCoords = this.getCoords.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    getCoords = (userlocation) => {
        this.props.getCoords(userlocation)
    }


    getToken = (token) => {
        this.props.getToken(token);
    }

    render() {
        return(
            <div style={{marginTop: 0, height: "700px"}}>
                <LoginHeader getCoords={this.getCoords} getToken={this.getToken}/>
                    <Layout className="layout" style={{marginTop: 0}}>
                        <Content className="content-container" style={{ margin: '24px 16px 0', overflow: 'initial'}}>
                            <div className="content-div" style={{ textAlign: 'center', width: "1250px", height: "600px"}}>
                                <Title style={{font: "Helvetica"}}>
                                    <br/>
                                     <p style={{font:"Helvetica"}}>What is WikiWhere?</p>
                                </Title>
                                <Text style={{fontSize: 26}}>
                                    <p style ={{fontFamily: "Garamond"}}>
                                    WikiWhere is a culmination of technology, utilizing Google's API
                                    services to derive <br/> user location and information on places around the user.
                                    The data retrieved from the user's location<br/> is then sent to Wikipedia, which finds the most
                                    relevant and germane articles and returns <br/> them to the user.<br/>
                                    </p>
                                </Text>
                                
                                
                                <Title>
                                     What does WikiWhere do?
                                </Title>
                                <br/>
                                <Text style={{fontSize: 26}}>
                                    <p style={{fontFamily: "Garamond"}}>
                                    Just as the name suggests, WikiWhere pulls in data from all around you<br/>
                                    and return relevent Wikipedia articles that you may find useful or <br></br> interesting. 
                                    Other features include favoriting articles you find enjoyable or finding <br/>articles related to
                                    the one you just viewed.
                                    </p>
                                </Text>

                            </div>
                        </Content>
                    <Sider className='sidebar-layout' style={{marginTop:24, marginLeft: "1290px", position: "fixed", height: "600px", marginRight: "1%"}} theme="dark" width={600}>
                        <SignUpCredentials/>
                    </Sider>
                    
                </Layout>
                <Footer theme="dark" style={{backgroundColor:"#0f2238", height: "117px"}}></Footer>
            </div>
        );
    }
}

export default withRouter(LogIn);