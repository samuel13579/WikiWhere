import React, { Component } from "react";
import { Form, Input, Row, Button } from "antd";
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

    // MAKE SURE TO CHANGE ROW MARGINRIGHT: 100 AND BUTTON MARGELEFT: 300
    // WHEN DONE

    render(){

        return(
                <Form
                    style={{
                        marginLeft:480
                    }}
                    theme="dark"
                    layout="horizontal"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}>
                    <Row style={{float: "right", marginBottom: -10, marginLeft: 0, width: 1000, position: "fixed"}} align="middle">
                        <div style={{float: "right"}}>
                            <Form.Item
                                label={<p style={{color: "white", marginTop: 80, fontSize: 16}}>Username:</p>}
                                name="username"
                            >
                                <Input onChange={this.onUsernameChange} style={{marginTop: 15, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{marginLeft: 250, float: "right"}}>
                            <Form.Item
                                label={<p style={{color: "white", marginTop: 80, fontSize: 16}}>Password:</p>}
                                name="password"
                                >
                            <Input onChange={this.onPasswordChange} style={{ marginTop: 15, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{marginLeft: 250, marginRight: 0, marginBottom: 15, float: "right"}}>
                        <Link to="/mainmap">
                                <Button type="Primary" size="medium" ghost={true} style={{marginLeft: 1, marginTop: 25}} onClick={this.onLogin}>Log in</Button>
                        </Link>
                        </div>
                    </Row>
                </Form>
        );
    }
}

export default withRouter(LoginCredentials);