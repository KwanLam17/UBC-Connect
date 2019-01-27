import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './GoogleMap.css';

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

    shouldMakeNewMarker(lat1, lat2, lon1, lon2) {
        let R = 6371e3;
        let lat1_rad = this.radians(lat1);
        let lat2_rad = this.radians(lat2);
        let lat_change = this.radians(lat2 - lat1);
        let lon_change = this.radians(lon2 - lon1);

        let a = Math.sin(lat_change/2) * Math.sin(lat_change/2) +
            Math.cos(lat1_rad) * Math.cos(lat2_rad) *
            Math.sin(lon_change/2) * Math.sin(lon_change/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        let d = R * c;
        console.log(d);
        return d > RADIUS;
    }

    radians = function(degrees) {
        return degrees * Math.PI / 180;
    };


    onMapClicked = (mapProps, props, map, clickEvent) => {

        for (let eventMarker of this.state.eventMarkers) {
            if (!this.shouldMakeNewMarker(eventMarker.lat, map.latLng.lat(),
                eventMarker.lng, map.latLng.lng())) {
                return;
            }
        }


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