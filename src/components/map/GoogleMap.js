import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './GoogleMap.css';

// const style = {
//     position: 'absolute',
//  margin: 'auto',
//  top: 0,
//  right: 600,
//  bottom: 220,
//  left: 0,
//  width: 670,
//  height: 500,
//   }

// const style = {
//     position: 'absolute',
//  margin: 'auto',
//  top: 0,
//  right: 0,
//  bottom: 0,
//  left: 0,
//  width: '100%',
//  height: '100%',
//   }

class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            eventMarkers: [],
            selectedPlace: {}
        };
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });

    onMapClicked = (mapProps, props, map, clickEvent) => {
        // console.log(props);
        // console.log(map.latLng.lat())
        let newEventMarkers = [... this.state.eventMarkers];

        newEventMarkers.push({
            lat: map.latLng.lat(),
            lng: map.latLng.lng(),
            numOfEvents: 1
        });

        this.props.eventsHandler(newEventMarkers)

        this.setState({
            eventMarkers: newEventMarkers,
            selectedPlace: {},
        })

        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    renderMarkers() {
        return this.state.eventMarkers.map( marker => {
            return (
                    <Marker 
                        key= {marker.lat + marker.lng}
                        onClick={this.onMarkerClick}
                        position={{lat: marker.lat, lng: marker.lng}}
                        name={marker.numOfEvents}/>
            )
        })
    }

    render() {
        return (
            <div style={{
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

                    {this.renderMarkers()}

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
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
                <div>:)</div>
            </div>
        )
    }
}

export default (GoogleApiWrapper({
    apiKey: "AIzaSyDnPlU5in_-pgigO6zRLGXB6sYG7B0h0v8"
}))(GoogleMap);