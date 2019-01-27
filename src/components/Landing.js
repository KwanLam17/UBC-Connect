import React, { Component } from 'react';

import GoogleMap from './map/GoogleMap';
import GoogleList from './map/GoogleList';

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: []
        };

        this.eventsHandler = this.eventsHandler.bind(this)
    }

    eventsHandler(events) {
        // console.log(events);
        this.setState({
            events: events
        });
    }

    render() {
        // console.log(this.state.events)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <GoogleMap eventsHandler = {this.eventsHandler} />
                        <GoogleList eventList = {this.state.events} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;