import React, { Component } from 'react';
import { connect } from 'react-redux';

class GoogleList extends Component {
    renderEvents() {
        return <li> {this.props.eventList["numOfEvents"]} </li>

        // return this.props.eventList.map( event => {
        //     return (
        //         <li>
        //             TEST
        //         </li>
        //     )
        // })
    }

    render() {
        console.log(this.props);
        if(this.props.eventList["empty"] === true){
            return (
                <div>
                    No results...
                </div>
            )
        }

        // console.log(this.props.movies[0].poster_path);
        return (
            <ul>
                {this.renderEvents()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.movies.results)
    return { events: state.events };
}

export default connect(mapStateToProps)(GoogleList);