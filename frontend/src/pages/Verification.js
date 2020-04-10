import React, { Component } from 'react';
import axios from 'axios';

class Verification extends Component {

    constructor(props){
        super(props);
    }

    async componentDidMount(){

        const token = this.props.match.params

        console.log(token);

        // await axios.post("https://wiki-where.herokuapp.com/verify/" + token)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));

        // return this.props.history.push('/mainmap');
    };


    render(){
        return(
            <div></div>
        );
    }
}

export default Verification;