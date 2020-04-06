import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

class SignUpCredentials extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            confirmpass: '',
            confrimemail: ''
          };

          this.onUsernameChange = this.onUsernameChange.bind(this);
          this.onPasswordChange = this.onPasswordChange.bind(this);
          this.onEmailChange = this.onEmailChange.bind(this);
          this.onConfirmPassChange = this.onConfirmPassChange.bind(this);
          this.onConfirmEmailChange = this.onConfirmEmailChange.bind(this);
          this.onSignUp = this.onSignUp.bind(this);
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

    onEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }

    onConfirmPassChange(e){
        this.setState({
            confirmpass: e.target.value
        });
    }

    onConfirmEmailChange(e){
        this.setState({
            confrimemail: e.target.value
        });
    }

    onSignUp = async event => {
        
   }

    render() {
        return (
            <Form
                theme="dark"
                layout="horizontal"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                >
                    {<p style={{color: "white", fontSize: 32}}>Sign Up!</p>}
                    <Form.Item
                        label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Username:</p>}
                        name="username"
                        style={{marginLeft: 100, marginRight: 30}}
                    >
                    <Input style={{marginTop:0}} onChange={this.onUsernameChange}/>
                    </Form.Item>

                    <Form.Item
                        label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Password:</p>}
                        name="password"
                        style={{marginLeft: 105, marginRight: 30}}
                    >
                    <Input style={{marginTop:10}} onChange={TouchList.onPasswordChange}/>
                    </Form.Item>

                    <Form.Item
                    label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Confirm Password:</p>}
                        name="confirmpassword"
                        style={{marginLeft: 45, marginRight: 30}}
                    >
                    <Input style={{marginTop:10}} onChange={this.onConfirmPassChange}/>
                    </Form.Item>

                    <Form.Item
                        label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Email:</p>}
                        name="email"
                        style={{marginLeft: 135, marginRight: 30}}
                    >
                    <Input style={{marginTop:10}} onChange={this.onEmailChange}/>
                    </Form.Item>

                    <Form.Item
                        label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Confrim Email:</p>}
                        name="email"
                        style={{marginLeft: 73, marginRight: 30}}
                    >
                    <Input style={{marginTop:10}} onChange={this.onConfirmEmailChange}/>
                    </Form.Item>
                <Button type="Primary" ghost={true} style={{marginBottom:20}} onClick={this.onSignUp}>Sign up</Button>

            </Form>
        );
    }
}

export default SignUpCredentials;