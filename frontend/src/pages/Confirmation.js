import React, { Component } from 'react';
import { Result, Button, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Confirmation extends Component {

    constructor(props){
        super(props);

        this.state ={
            emailToken: '',
            errorMsg: '',
            error: false,
            view: false
        }

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onTokenChange = this.onTokenChange.bind(this);
        this.submitToken = this.submitToken.bind(this);
    }

    onButtonClick = () => {
        return this.props.history.push('/');
    }

    onTokenChange(e) {
        this.setState({
            emailToken: e.target.value,
        });
    }

    async submitToken(){

        this.setState({
            error: false,
            errorMsg: true
        });

        console.log(this.state.emailToken)
        console.log("https://wiki-where.herokuapp.com/api/verify/" + this.state.emailToken)
        console.log(this.state.view);
       
        await axios.post("https://wiki-where.herokuapp.com/api/verify/" + this.state.emailToken.trim())
            .then(res => console.log(res), this.setState({view: true}))
            .catch(err => console.log(err), this.setState({error: true}));

        console.log(this.state.view);

        if (this.state.error)
        {

        }
    }

    render() {

        function View(props) {

            const view = props.view;

            if (view)
            {
                return (
                    <Result
                    status="success"
                    title="Email successfully confirmed!"
                    subTitle="Click the button below to go back to the login page."
                    extra={
                        <Button type="primary" key="console" onClick={props.onButtonClick}>
                            Back to login
                        </Button>
                    }
                  /> 
                );
            }
            else
            {
                return(
                    <div>
                        <p>Enter email token: </p>
                        <Input style={{width: "50%"}}/>
                        <Button type="primary" key="console" onClick={props.submitToken}>
                            Submit Token
                        </Button>
                    </div>
                );
            }
        }

        return (
            <View 
            view={this.state.view}
            onTokenChange={this.onTokenChange}
            submitToken={this.submitToken}
            onButtonClick={this.onButtonClick}
            ></View>
        );
    }
}

export default withRouter(Confirmation)