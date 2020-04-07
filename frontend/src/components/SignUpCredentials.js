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
            token: '',
            userConfirm: false,
            passwordConfrim: false,
            emailConfirm: false
          };

          this.onUsernameChange = this.onUsernameChange.bind(this);
          this.onPasswordChange = this.onPasswordChange.bind(this);
          this.onEmailChange = this.onEmailChange.bind(this);
          this.onConfirmPassChange = this.onConfirmPassChange.bind(this);
          this.onConfirmEmailChange = this.onConfirmEmailChange.bind(this);
          this.onSignUp = this.onSignUp.bind(this);
          this.getSignUpAcceptState = this.getSignUpAcceptState.bind(this);
    }

    onUsernameChange(e){
        this.setState({
            username: e.target.value,
            userConfirm: true
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

        if (this.state.password == e.target.value)
        {
            this.setState({
                passwordConfrim: true
            })
        }
    }

    onConfirmEmailChange(e){
        this.setState({
            confrimemail: e.target.value
        });

        if (this.state.email == e.target.value)
        {
            this.setState({
                emailConfirm: true
            })
        }
    }

    getSignUpAcceptState(){
        return (this.state.passwordConfrim && this.state.emailConfirm 
            && this.state.userConfirm);
    }

    onSignUp = async event => {

        if (!this.getSignUpAcceptState())
        {
            return null;
        }

        const signupDetails = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,   
        }

        await axios.post("http://localhost:5000/api/signup", signupDetails)
            .then(res => this.setState({token: res.data.token}))
            .catch(error => console.log(error));

        localStorage.setItem('token', this.state.token)
   }

    render() {
        return (
            <Form
                theme="dark"
                layout="horizontal"
                name="basic"
                hideRequiredMark= {true}
                initialValues={{
                    remember: true,
                }}
            >
                    {<p style={{color: "white", fontSize: 32}}>Sign Up!</p>}
                    <Form.Item
                        label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Username:</p>}
                        name="username"
                        style={{marginLeft: 100, marginRight: 30}}
                        rules={[
                            {
                                required: true,
                                message: "Please enter a username."
                            },
                        ]}
                    >
                    <Input style={{marginTop:0}} onChange={this.onUsernameChange}/>
                    </Form.Item>

                    <Form.Item
                        label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Password:</p>}
                        name="password"
                        style={{marginLeft: 105, marginRight: 30}}
                        rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                          ]}
                        hasFeedback
                    >
                    <Input.Password type="password"style={{marginTop:10}} onChange={this.onPasswordChange}/>
                    </Form.Item>

                    <Form.Item
                    label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Confirm Password:</p>}
                        name="confirmpassword"
                        style={{marginLeft: 45, marginRight: 30}}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {   
                            required: true,
                            message: 'Please confirm your password!',
                        },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                              },
                            }),
                        ]}
                    >
                    <Input.Password style={{marginTop:10}} onChange={this.onConfirmPassChange}/>
                    </Form.Item>

                    <Form.Item
                        label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Email:</p>}
                        name="email"
                        style={{marginLeft: 135, marginRight: 30}}
                        rules={[
                            {
                              required: true,
                              message: 'Please input your email!',
                            },
                          ]}
                    >
                    <Input style={{marginTop:10}} onChange={this.onEmailChange}/>
                    </Form.Item>

                    <Form.Item
                        label={<p style={{color: "white", marginTop: 35, fontSize: 16}}>Confirm Email:</p>}
                        name="emailconfirm"
                        style={{marginLeft: 73, marginRight: 30}}
                        dependencies={['email']}
                        hasFeedback
                        rules={[
                        {   
                            required: true,
                            message: 'Please confirm your email!',
                        },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('email') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two emails that you entered do not match!');
                              },
                            }),
                        ]}
                    >
                    <Input style={{marginTop:10}} onChange={this.onConfirmEmailChange}/>
                    </Form.Item>

                <Button type="Primary" ghost={true} style={{marginBottom:20}} onClick={this.onSignUp}>Sign up</Button>

            </Form>
        );
    }
}

export default SignUpCredentials;