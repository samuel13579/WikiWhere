import React, { Component, useState } from "react";
import { Form, Input, Row, Button, Affix} from "antd";
import { Link, withRouter } from 'react-router-dom';

class LoginCredentials extends Component{

    constructor(props){
        super(props);
    
        this.state ={
            username: '',
            password: ''
        }

        this.onLogin = this.onLogin.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onUsernameChange(e){
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }

    onLogin = event => {

        return this.props.history.push('/mainmap');
    }

    render(){

        return(
                <Form
                    className="login-header-layout"
                    style={{
                        marginLeft:480,
                        marginTop: 15    
                    }}
                    theme="dark"
                    layout="horizontal"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}>
                    <Row>
                        <div style={{position: "absolute"}}>
                            <Form.Item
                                label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Username:</p>}
                                name="username"
                            >
                                <Input onChange={this.onUsernameChange} style={{marginTop: -17, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{marginLeft: 325}}>
                            <Form.Item
                                label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Password:</p>}
                                name="password"
                                >
                            <Input onChange={this.onPasswordChange} style={{ marginTop: -17, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{position: "absolute", marginLeft: 600}}>
                        <Link to="/mainmap">
                                <Button type="Primary" ghost={true} style={{marginLeft: 40}} onClick={this.onLogin}>Log in</Button>
                        </Link>
                        </div>
                    </Row>
                </Form>
        );
    }
}

export default withRouter(LoginCredentials);