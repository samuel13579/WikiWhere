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
            visible: false
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

    onLogin = async event => {

        console.log("On login error is " + this.state.error);
        const loginDetails = {
            username: this.state.username,
            password: this.state.password
        }

        await this.setState({
            error: false
        })

        console.log("After initial set state error is " + this.state.error);

        await axios.post("https://wiki-where.herokuapp.com/api/login", loginDetails)
            .then(res => (console.log(res) , console.log("Then")))
            .catch(err => (console.log("catch"), console.log(err), this.setState({error: true})));

        console.log("After axios call, error is " + this.state.error);
        
        if (this.state.error)
        {
            this.showModal();
            return null
        }

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
                    <Row style={{float: "right", marginBottom: -10, marginLeft: 625, width: 1000, position: "fixed"}} align="middle">
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
                            title="Username Already Exists"
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