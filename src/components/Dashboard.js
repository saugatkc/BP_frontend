import React, { Component } from 'react'
import Navigation from './Navigation';


export default class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
            <div>
            <Navigation/>
                <h1>checkedin</h1>
            </div>
            </React.Fragment>

        )
    }
}
