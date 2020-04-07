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
                    <Row style={{float: "right"}}>
                        <div style={{float: "right"}}>
                            <Form.Item
                                label={<p style={{color: "white", marginTop: 50, fontSize: 16}}>Username:</p>}
                                name="username"
                            >
                                <Input onChange={this.onUsernameChange} style={{marginTop: 0, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{marginLeft: 250, float: "right"}}>
                            <Form.Item
                                label={<p style={{color: "white", marginTop: 50, fontSize: 16}}>Password:</p>}
                                name="password"
                                >
                            <Input onChange={this.onPasswordChange} style={{ marginTop: 0, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{marginLeft: 200, float: "right"}}>
                        <Link to="/mainmap">
                                <Button type="Primary" ghost={true} style={{marginLeft: 50, marginTop: 17}} onClick={this.onLogin}>Log in</Button>
                        </Link>
                        </div>
                    </Row>
                </Form>
        );
    }
}

export default withRouter(LoginCredentials);