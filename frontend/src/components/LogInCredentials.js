import React, { Component } from "react";
import { Form, Input, Row, Button, Modal } from "antd";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginCredentials extends Component{

    constructor(props){
        super(props);
    
        this.state ={
            username: '',
            password: '',
            error: false,
            visible: false,
            userlocation: {
                lat: 0,
                lng: 0
            }
        }

        this.onLogin = this.onLogin.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.cancel = this.cancel.bind(this);
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

    showModal() {
        this.setState({
            visible: true,
        });
    };

    cancel(e) {
        this.setState({
            visible: false
        });
    }

    async componentDidMount(){
        if (navigator.geolocation) {
          await navigator.geolocation.getCurrentPosition(async (position) => {
                await this.setState({
                        userlocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                        }
                });
          });
        }
    }

    onLogin = async event => {

            if (navigator.geolocation) {
              await navigator.geolocation.getCurrentPosition(async (position) => {
                    await this.setState({
                            userlocation: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                            }
                    });
              });
            }
    
            console.log(this.state.userlocation)
    
        const loginDetails = {
            username: this.state.username,
            password: this.state.password
        }

        await this.setState({
            error: false
        })

        await axios.post("https://wiki-where.herokuapp.com/api/user/login", loginDetails)
            .then(res => this.setState({token: res.data.token, success: true}))
            .catch(err =>  (this.setState({error: true})));
        
        localStorage.setItem('token', this.state.token)
        
        if (this.state.error)
        {
            this.showModal();
            return null
        }
        
        this.props.getCoords(this.state.userlocation);
        return this.props.history.push('/mainmap');
    }

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
                    <Row style={{float: "right", marginBottom: -10, marginLeft: 610, width: 1000, position: "fixed"}} align="middle">
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
                            <Input.Password onChange={this.onPasswordChange} style={{ marginTop: 15, position: "absolute", width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{marginLeft: 250, marginRight: 0, marginBottom: 15, float: "right"}}>
                            <Button type="Primary" size="medium" ghost={true} style={{marginLeft: 1, marginTop: 25}} onClick={this.onLogin}>Log in</Button>
                        </div>
                    </Row>

                    <Modal
                            title="Incorrect Login Credentials"
                            visible={this.state.visible}
                            onOk={this.cancel}
                            onCancel={this.cancel}
                            footer={[
                                <Button key="back" onClick={this.cancel}>
                                Okay
                                </Button>
                            ]}>
                            <p>Your username or password is incorrect.</p>
                        </Modal>

            </Form>
        );
    }
}

export default withRouter(LoginCredentials);