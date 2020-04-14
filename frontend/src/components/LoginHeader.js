import React, { Component } from 'react';
import { Layout, Typography } from 'antd';
import LoginCredentials from './LogInCredentials';
import { withRouter } from 'react-router-dom';
import logo from "./wikiwhere.png";

const { Header } = Layout;
const { Title } = Typography;

class LoginHeader extends Component {

    constructor(props){
        super(props);

        this.getCoords = this.getCoords.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    getCoords = (userlocation) =>{
        this.props.getCoords(userlocation)
    }

    getToken = (token) => {
        this.props.getToken(token);
    }

    render() {

        return(
            <Header className="site-layout-background" style={{height: 80}}>
                <Title style={{ color: "white", position: 'absolute', marginTop: "25px"}}>
                    <p style={{fontFamily: "Sans Serif", fontStyle: "Microsoft", marginRight:"200px"}}>WikiWhere</p>
                    <img src={logo} style={{width:"100px", marginTop: "-200px", marginLeft: "75px"}}/>
                </Title>
                <LoginCredentials getCoords={this.getCoords} getToken={this.getToken}/>
            </Header>
        );
    }
}

export default withRouter(LoginHeader); 