import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class FeatureItem extends Component {
    render() {
        const { feature } = this.props
        return (
            
            <tr>
                <td>
                    {
                         <span>{feature.feature}</span>
                    }
                </td>
                <td>
                    <Button size='sm' color='warning' onClick={() => this.props.handleEdit(feature._id)}>Edit</Button>
                </td>
                <td>
                    <Button size='sm' color='danger'
                        onClick={() => this.props.handleDelete(feature._id)}>Delete</Button>
                </td>
            </tr>
        )
    }
}
