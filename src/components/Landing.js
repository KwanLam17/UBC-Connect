import React, { Component } from 'react';

import GoogleMap from './map/GoogleMap';

class Landing extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <GoogleMap />
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;