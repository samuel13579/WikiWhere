import React, { Component } from 'react';
import MainMap from './pages/MainMap';
import LogIn from './pages/LogIn';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path ="/" component={LogIn}/>
            <Route exact path ="/mainmap" component={MainMap}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
