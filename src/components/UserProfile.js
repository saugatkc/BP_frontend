import React, { Component } from 'react'
import Navigation from './Navigation'
import Axios from 'axios'
import { Form, FormGroup, Input, Button, Label, CustomInput, Container } from 'reactstrap'
import FileUploadButton from './FileUploadButton'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hotel: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/hotels/me', this.state.config)
            .then((response) => {
                this.setState({
                    hotel: response.data
                })
            });
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/uploads/hotel', data, this.state.config)
            .then((response) => {
                this.setState({
                    hotel: { ...this.state.hotel, profileimage: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/hotels/me', this.state.hotel, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        this.props.history.push('/dashboard');
    }

    handleChange(e) {
        this.setState({
            hotel: { ...this.state.hotel, [e.target.name]: e.target.value }
        })
    }

    render() {
        if (this.state.hotel === null) {
            return <h3>Loading ...</h3>
        } else {
            return (
                <div>
                    <Navigation />
                    <Container className='mt-4'>
                        <Form>
                        <FormGroup>
                                <img className='img-thumbnail'
                                    width='400' src={`http://localhost:3001/uploads/hotel${this.state.hotel.profileimage}`}
                                    alt="profile" />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label for='owner'>Owner</Label>
                                <Input type='text'
                                    id="owner"
                                    name='owner'
                                    value={this.state.hotel.owner}
                                    onChange={(e) => this.handleChange(e)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='hotelname'>Hotel Name</Label>
                                <Input type='text' id='hotelname'
                                    name='hotelname'
                                    value={this.state.hotel.hotelname}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='phone'>Phone</Label>
                                <Input type='text' id='phone'
                                    name='phone'
                                    value={this.state.hotel.phone}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input type='text' id='email'
                                    name='email'
                                    value={this.state.hotel.email}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='addressDistrict'>District</Label>
                                <Input type='text' id='addressDistrict'
                                    name='addressDistrict'
                                    value={this.state.hotel.addressDistrict}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='addressCity'>City</Label>
                                <Input type='text' id='addressCity'
                                    name='addressCity'
                                    value={this.state.hotel.addressDistrict}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='noOfRooms'>No Of Rooms</Label>
                                <Input type='text' id='noOfRooms'
                                    name='noOfRooms'
                                    value={this.state.hotel.noOfRooms}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='price'>Price per room</Label>
                                <Input type='text' id='price'
                                    name='price'
                                    value={this.state.hotel.price}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='latitude'>Latitude in map</Label>
                                <Input type='text' id='latitude'
                                    name='latitude'
                                    value={this.state.hotel.latitude}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='longitude'>Longitude in map</Label>
                                <Input type='text' id='longitude'
                                    name='longitude'
                                    value={this.state.hotel.longitude}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <Button color='danger' onClick={this.updateUser} block>Update User</Button>
                        </Form>
                    </Container>
                </div>
            )
        }
    }
}
