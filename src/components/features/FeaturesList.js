import React, { Component } from 'react'
import { Table } from 'reactstrap'
import FeatureEdit from './FeatureEdit'
import FeatureItem from './FeatureItem'

export default class FeatureList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showEdit: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            feature: {}
        }
    }

    handleEdit = (featureId) => {
        this.setState({
            feature: this.props.features.find((feature) => {
                return feature._id === featureId
            })
        })
        this.toggle();
    }

    toggle = () => {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    handleFeatureNameChange = (featureName) => {
        this.setState({
            feature: { ...this.state.feature, feature: featureName }
        })
    }

    handleFeatureDoneChange = (isDone) => {
        this.setState({
            feature: { ...this.state.feature, done: isDone }
        })
    }
    updateFeature = (updateFeature) => {
        this.props.updateFeature(updateFeature)
    }
    render() {
        const { features } = this.props
        return (
            <div>
                <Table id='featuretable'>
                    <thead className="table-dark">
                        <th>Feature</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {
                            features.map((feature) => {
                                return <FeatureItem key={feature._id} feature={feature}
                                    handleDelete={this.props.handleFeatureDelete}
                                    handleEdit={this.handleEdit} />
                            })
                        }
                    </tbody>
                </Table>

                <FeatureEdit showEdit={this.state.showEdit} toggle={this.toggle}
                    feature={this.state.feature}
                    handleFeatureNameChange={this.handleFeatureNameChange}
                    handleFeatureDoneChange={this.handleFeatureDoneChange}
                    updateFeature={this.updateFeature}

                />
            </div>
        )
    }
}
