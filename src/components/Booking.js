import React, { Component } from 'react'
import Navigation from './Navigation';

export default class Booking extends Component {
    render() {
        return(
            <React.Fragment>
            <div>
            <Navigation/>
                <h1>bookings</h1>
            </div>
            </React.Fragment>

        )
    }
}
