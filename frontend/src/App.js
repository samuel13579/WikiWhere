import React, { Component } from 'react';
import MainMap from './pages/MainMap';
import LogIn from './pages/LogIn';
import Confirmation from './pages/Confirmation'
import Verification from './pages/Verification'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      userlocation: {
        lat:0,
        lng:0
      },

      token: ''
    }
    this.getCoords = this.getCoords.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  getCoords = (userlocation) => {
    this.setState({
      userlocation: userlocation
    })
  }

  getToken = (token) => {
    this.setState({
      token: token
    })
  }

  render(){
    return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path ="/" render={props=><LogIn getCoords={this.getCoords} getToken={this.getToken}></LogIn>}/>
              <Route exact path ="/mainmap" render={props=><MainMap userlocation={this.state.userlocation} {...props}></MainMap>}/>
              <Route exact path ='/confirmation' component={Confirmation}/>
              <Route exact path ='/verification/:token' component={Verification}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
