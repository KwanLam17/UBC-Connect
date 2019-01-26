import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './GoogleMap.css';

class GoogleMap extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });

    onMapClicked = (props) => {
        console.log(props);
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    render() {
        return (
            <div className="map" style={{
                position: 'absolute',
            margin: 'auto',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 900,
            height: 500,
            }}>
                <Map 
                    google={this.props.google} 
                    initialCenter={{
                        lat: 49.2606,
                        lng: -123.2460
                    }}
                    zoom={14}
                    onClick={this.onMapClicked}>

                    <Marker onClick={this.onMarkerClick}
                            name={ 'Current Location' } />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDnPlU5in_-pgigO6zRLGXB6sYG7B0h0v8"
})(GoogleMap);