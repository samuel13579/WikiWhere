import React, { Component } from "react";
import { Form, Input, Row, Button} from "antd";
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
                <Row >
                    <div>
                        <Form.Item
                            label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Username:</p>}
                            name="username"
                        >
                            <Input onChange={this.onUsernameChange}/>
                        </Form.Item>
                    </div>
                    <div style={{marginLeft: 50}}>
                        <Form.Item
                            label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Password:</p>}
                            name="password"
                            >
                        <Input onChange={this.onPasswordChange}/>
                        </Form.Item>
                    </div>
                    <Link to="/mainmap">
                        <Button type="Primary" ghost={true} style={{marginLeft: 40}} onClick={this.onLogin}>Log in</Button>
                    </Link>
                </Row>
            </Form>
        );
    }
}

export default withRouter(LoginCredentials);