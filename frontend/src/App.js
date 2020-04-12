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
      }
    }
    this.getCoords = this.getCoords.bind(this);
  }

  getCoords = (userlocation) => {
    this.setState({
      userlocation: userlocation
    })
  }

  render(){
    return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path ="/" render={props=><LogIn getCoords={this.getCoords}></LogIn>}/>
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
