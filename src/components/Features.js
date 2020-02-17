import React, { Component } from 'react'
import { Container } from 'reactstrap'
import FeatureForm from './features/FeatureForm';
import FeatureList from './features/FeaturesList';
import Axios from 'axios';
import Navigation from './Navigation';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            features: [],
            currentFeature: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/hotels/features/get/b', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    features: response.data
                })
            })
    }

    handleCurrentFeatureChange = (newFeature) => {
        this.setState({
            currentFeature: newFeature
        })
    }

    handleFeatureSubmit = (e) => {
        e.preventDefault();
        if (!this.state.currentFeature) return;

        Axios.post('http://localhost:3001/hotels/features', { feature: this.state.currentFeature },
            this.state.config).then((response) => {
                this.setState({
                    Features: [...this.state.features, response.data],
                    currentFeature: ''
                })
            })
    }

    handleFeatureDelete = (featureId) => {
        const filteredFeature = this.state.features.filter((feature) => {
            return feature._id !== featureId
        })
        this.setState({
            features: filteredFeature
        })
        Axios.delete(`http://localhost:3001/hotels/features/${featureId}`, this.state.config)
    }

    updateFeature = (updatedFeature) => {
        const updatedFeatures = this.state.features.map((feature) => {
            if (feature._id === updatedFeature._id) {
                feature = updatedFeature
            }
            return feature;
        })
        this.setState({
            features: updatedFeatures
        })
        Axios.put(`http://localhost:3001/hotels/features/${updatedFeature._id}`,
            { feature: updatedFeature.feature },
            this.state.config).then((response) => console.log(response.data));
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
                    <FeatureForm currentFeature={this.state.currentFeature}
                        handleCurrentFeatureChange={this.handleCurrentFeatureChange}
                        handleFeatureSubmit={this.handleFeatureSubmit}
                    />
                    <FeatureList features={this.state.features}
                        handleFeatureDelete={this.handleFeatureDelete}
                        updateFeature={this.updateFeature} />
                </Container>
            </React.Fragment>
        )
    }
}
