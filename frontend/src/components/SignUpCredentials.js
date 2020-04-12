import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { CheckCircleFilled } from '@ant-design/icons';

function SuccessText(props){
    if (props.success)
    {
        return(
            <p style={{color: "white"}}>Sign up successful! A verification email has been sent.</p>
        )
    }
    else
    {
        return (<div></div>)
    }
}

function ButtonOrCheck(props){
    if (props.success)
    {
        return(
            <CheckCircleFilled style={{color: "green", fontSize: "21"}}></CheckCircleFilled>
        )
    }
    else
    {
        return (
            <Button type="Primary" ghost={true} style={{marginTop: "10px"}} onClick={props.showModal}>Sign up</Button>
        )
    }
}

class SignUpCredentials extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            token: '',
            error: false,
            visible: false,
            userExists: false,
            userConfirm: false,
            passwordConfrim: false,
            emailConfirm: false,
            success: false
          };

          this.onUsernameChange = this.onUsernameChange.bind(this);
          this.onPasswordChange = this.onPasswordChange.bind(this);
          this.onEmailChange = this.onEmailChange.bind(this);
          this.onConfirmPassChange = this.onConfirmPassChange.bind(this);
          this.onConfirmEmailChange = this.onConfirmEmailChange.bind(this);
          this.onSignUp = this.onSignUp.bind(this);
          this.getSignUpAcceptState = this.getSignUpAcceptState.bind(this);
          this.cancel = this.cancel.bind(this);
          this.showModal= this.showModal.bind(this);
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

    cancel(e) {
        this.setState({
            visible: false
        });
    }


    getSignUpAcceptState(){
        return (this.state.passwordConfrim && this.state.emailConfirm 
            && this.state.userConfirm && !this.state.userExists);
    }

    showModal = async event => {

        const detail = {
            username: this.state.username
        }

        await axios.post("https://wiki-where.herokuapp.com/api/checkuser", detail)
            .then(res => this.setState({userExists: true}))
            .catch(error => this.setState({userExists: false}));

        if (this.state.userExists) {
            this.setState({
                visible: true,
              });
        }

        this.onSignUp()
    };

    async onSignUp(){

        const allow = {
            passconf: this.state.passwordConfrim, 
            emailconf: this.state.emailConfirm,
            userconfrim: this.state.userConfirm,
            userexists: !this.state.userExists
        }

        console.log(allow)

        if (!this.getSignUpAcceptState())
        {
            return null;
        }

        const signupDetails = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        await axios.post("https://wiki-where.herokuapp.com/api/signup", signupDetails)
            .then(res => this.setState({token: res.data.token, success: true}))
            .catch(error => this.setState({error: true}));

        // localStorage.setItem('token', this.state.token)
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
                    {<p style={{color: "white", fontSize: 32, marginTop: "20px"}}>Sign Up!</p>}
                    <Form.Item
                        label={<p style={{color: "white", marginTop: 15, fontSize: 16}}>Username:</p>}
                        name="username"
                        style={{marginLeft: 100, marginRight: 30, marginTop: "20px"}}
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
                        style={{marginLeft: 105, marginRight: 30, marginTop: "50px"}}
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
                        style={{marginLeft: 45, marginRight: 30, marginTop: "50px"}}
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
                        style={{marginLeft: 135, marginRight: 30, marginTop: "50px"}}
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
                        style={{marginLeft: 73, marginRight: 30, marginTop: "50px"}}
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

                <ButtonOrCheck success={this.state.success} showModal={this.showModal}></ButtonOrCheck>
                <SuccessText success={this.state.success}></SuccessText>
                

                <Modal
                            title="Username Already Exists"
                            visible={this.state.visible}
                            onOk={this.cancel}
                            onCancel={this.cancel}
                            footer={[
                                <Button key="back" onClick={this.cancel}>
                                Okay
                                </Button>
                            ]}>
                            <p>The username you have entered already exists. Please choose a new one.</p>
                        </Modal>

            </Form>
        );
    }
}

export default SignUpCredentials;