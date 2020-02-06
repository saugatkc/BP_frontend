import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            owner: '',
            hotelname: '',
            username: '',
            password: '',
            phone: '',
            email: '',
            addressDisrict:'',
            addressCity: '',
            noOfRooms: '',
            price:'',
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3001/hotels/signup', this.state)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    owner: '',
                    hotelname: '',
                    username: '',
                    password: '',
                    phone: '',
                    email: '',
                    addressDisrict:'',
                    addressCity: '',
                    noOfRooms: '',
                    price:'',
                    isRegistered: true
                });

            }).catch((err) => console.log(err))
    }


    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Container>
                <h2>Sign Up</h2>
                <Form>
                    <FormGroup>
                        <Label for='owner'>Owner Name</Label>
                        <Input type='text' name='owner' id='owner'
                            value={this.state.owner} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='hotelname'>Hotel Name</Label>
                        <Input type='text' name='hotelname' id='hotelname'
                            value={this.state.hotelname} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' id='username'
                            value={this.state.username} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password'
                            value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='phone'>phone</Label>
                        <Input type='text' name='phone' id='phone'
                            value={this.state.phone} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>email</Label>
                        <Input type='text' name='email' id='email'
                            value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='addressDistrict'>District</Label>
                        <Input type='text' name='addressDistrict' id='addressDistrict'
                            value={this.state.addressDistrict} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='addressCity'>City</Label>
                        <Input type='text' name='addressCity' id='addressCity'
                            value={this.state.addressCity} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='noOfRooms'>No of rooms</Label>
                        <Input type='text' name='noOfRooms' id='noOfRooms'
                            value={this.state.noOfRooms} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='price'>Price per room</Label>
                        <Input type='text' name='price' id='price'
                            value={this.state.price} onChange={this.handleChange} />
                    </FormGroup>

                    <Button color='primary' onClick={this.register}>Sign Up</Button>
                    <FormText>Already a user? <Link to='/'> Login here!</Link></FormText>
                </Form>
            </Container>
        )
    }
}
