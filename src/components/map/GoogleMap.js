import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './GoogleMap.css';

const RADIUS = 500;

const style= {
 top: 0,
 right: 550,
 bottom: 210,
 left: 0,
 width: 580,
 height: 530,
  }

class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            eventOrg: '',
            eventName: '',
            eventCap: '',
            create: false,
            location: false,
            successMsg: ''
        };

        this.locationMarkers = {
            "Nest": [],
            "Wesbrook": [],
            "UBC Village": [],
            "Thunderbird": [],
            "ICICS": []
        }

        this.currLocation;

        this.onMapClicked = this.onMapClicked.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.renderFormOrTable = this.renderFormOrTable.bind(this);
        this.renderEvents = this.renderEvents.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.currLocation = marker.name;

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            location: true,
            successMsg: ''
        });
    };

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
        // return d > RADIUS;
        return d;
    }

    radians = function(degrees) {
        return degrees * Math.PI / 180;
    };


    onMapClicked = (mapProps, props, map, clickEvent) => {
        // let newEventMarkers = [... this.state.eventMarkers];

        // let dist;
        // let index;

        // for (let i = 0; i < newEventMarkers.length; i++) {
        // // for (let eventMarker of newEventMarkers) {
        //     let tempDist = this.shouldMakeNewMarker(newEventMarkers[i].lat, map.latLng.lat(),
        //         newEventMarkers[i].lng, map.latLng.lng());

        //     if (dist === undefined) {
        //         dist = tempDist;
        //         index = i;
        //     } else if (dist >= tempDist) {
        //         dist = tempDist;
        //         index = i;
        //     }
        // }

        // if (dist <= RADIUS) {
        //     let temp = newEventMarkers[index];
        //     temp["numOfEvents"]++;
        //     newEventMarkers.splice(index, 1);
        //     newEventMarkers.push(temp);
        //     this.setState({
        //     eventMarkers: newEventMarkers
        //     })
        //     // return;
        // } else {
        //     newEventMarkers.push({
        //         lat: map.latLng.lat(),
        //         lng: map.latLng.lng(),
        //         numOfEvents: 1
        //     });
    
        //     this.setState({
        //         eventMarkers: newEventMarkers,
        //         selectedPlace: {},
        //     })
        // }

        // this.props.eventsHandler(newEventMarkers[newEventMarkers.length - 1])

        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            location: false
          })
        }
      };

    // renderMarkers() {
    //     return this.state.locationMarkers.map( marker => {
    //         return (
    //                 <Marker 
    //                     key= {marker.lat + marker.lng}
    //                     onClick={this.onMarkerClick}
    //                     position={{lat: marker.lat, lng: marker.lng}}
    //                     name={marker.numOfEvents}/>
    //         )
    //     })
    // }

    renderFormOrTable() {
        if (this.state.location) {
            if (this.state.create) {
                return this.renderForm();
            } else {
                return this.renderList();
            }
        }
    }

    renderList() {
        console.log(this.locationMarkers);
        return (
            <table>
                <thead>
                    <td>
                        Creator
                    </td>
                    <td>
                        Event Name
                    </td>
                    <td>
                        Capacity
                    </td>
                </thead>
                <tbody>
                    {this.renderEvents()}
                </tbody>
            </table>
        )
    }

    renderEvents() {
        return this.locationMarkers[this.currLocation].map( event => {
            return (
                <tr id={event.eventName}>
                    <td>
                        {event.eventOrg}
                    </td> 
                    <td>
                        {event.eventName}
                    </td>
                    <td>
                        {event.eventCap} 
                    </td>
                </tr>
            )
        })
    }

    renderForm() {
        console.log(this.state.location);
        return (
            <div style={{position: "relative"}}>
                <div>{this.state.successMsg}</div>
                <form onSubmit={this.onFormSubmit}>
                    <input 
                        placeholder = 'Your Name'
                        className = "form-control"
                        value = {this.state.term}
                        onChange = {event => this.setState({ eventOrg: event.target.value})} 
                    />
                    <input 
                        placeholder = 'Event Name'
                        className = "form-control"
                        value = {this.state.term}
                        onChange = {event => this.setState({ eventName: event.target.value})} 
                    />
                    <input 
                        placeholder = 'Event Capacity'
                        className = "form-control"
                        value = {this.state.term}
                        onChange = {event => this.setState({ eventCap: event.target.value})} 
                    />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </span>
                </form>
            </div>
        )
    }

    onFormSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        this.locationMarkers[this.currLocation].push({
            eventOrg: this.state.eventOrg,
            eventName: this.state.eventName,
            eventCap: this.state.eventCap
        })

        console.log(this.locationMarkers);

        this.setState({ 
            eventOrg: '',
            eventName: '',
            eventCap: '',
            successMsg: 'Event successfully created'
        });
    }

    onCreateSubmit(event) {
        event.preventDefault();

        this.setState({
            create: !this.state.create,
            successMsg: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.onCreateSubmit}>
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Event Creation Toggle</button>
                    </span>
                </form>
                <Map 
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 49.2606,
                        lng: -123.2460
                    }}
                    zoom={14}
                    onClick={this.onMapClicked}>

                    {/* {this.renderMarkers()} */}

                    <Marker onClick={this.onMarkerClick}
                            position={{lat: 49.2664779, lng: -123.2503072}}
                            name={'Nest'} />

                    <Marker onClick={this.onMarkerClick}
                            position={{lat: 49.266506, lng: -123.242719}}
                            name={'UBC Village'} />
                    
                    <Marker onClick={this.onMarkerClick}
                            position={{lat: 49.2612336, lng: -123.2510563}}
                            name={'ICICS'} />

                    <Marker onClick={this.onMarkerClick}
                            position={{lat: 49.255050, lng: -123.236881}}
                            name={'Wesbrook Village'} />

                    <Marker onClick={this.onMarkerClick}
                            position={{lat: 49.2616552, lng: -123.2443197}}
                            name={'Thunderbird'} />

                            <InfoWindow
                       marker={this.state.activeMarker}
                       visible={this.state.showingInfoWindow}>
                       <div>
                           <h1>{this.state.selectedPlace.name}</h1>
                       </div>
                   </InfoWindow>
                    
                </Map>
                <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
                <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
                <div>.</div><div>.</div><div>.</div>
                {this.renderFormOrTable()}
            </div>
        );
    }
}

export default (GoogleApiWrapper({
    apiKey: "AIzaSyDnPlU5in_-pgigO6zRLGXB6sYG7B0h0v8"
}))(GoogleMap);

{/* <Marker onClick={this.onMarkerClick}
                            name={ 'Current Location' } /> */}