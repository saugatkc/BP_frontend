import React, { Component } from 'react'

export default class BookingItem extends Component {
    render() {
        const { booking } = this.props
        return (
            <tr>
                <td>
                    (booking.checkin)
                </td>
            </tr>

        )
    }
}
