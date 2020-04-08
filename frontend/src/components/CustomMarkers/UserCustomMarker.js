import React, { Component } from 'react';
import Marker from 'google-maps-react';  

var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
  };

class UserCustomMarker extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <Marker
                    google={this.props.google}
                    position={this.props.location}
                    name="Current Location"
                    icon={{
                        goldStar
                      }}
                >
                </Marker>
            </div>
        );
    }
}

export default UserCustomMarker