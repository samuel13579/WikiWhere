import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { withRouter } from 'react-router-dom';

class Confirmation extends Component {

    constructor(props){
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick = () => {
        return this.props.history.push('/');
    }

    render() {
         
        return (
            <Result
            status="success"
            title="Email successfully confirmed!"
            subTitle="Click the button below to go back to the login page."
            extra={
                <Button type="primary" key="console" onClick={this.onButtonClick}>
                    Back to login
                </Button>
            }
          /> 
        );
    }
}

export default withRouter(Confirmation)