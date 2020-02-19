import React, { Component } from 'react'
import Navigation from './Navigation';
import { Table } from 'reactstrap'
import { Container ,Button} from 'reactstrap'
import Axios from 'axios';

export default class Booking extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      status:"booked",

      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
       bookings: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/bookings/hotel/hotelbooking/booked',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({bookings:  data});
      console.log("data fecth");
    }).catch(error => console.log(error.response));
  }

  handleBookingUpdate = (bookingId) => {
    const filteredBooking = this.state.bookings.filter((completed) => {
        return completed._id !== bookingId
    })
    this.setState({
      bookings: filteredBooking
    })
    Axios.put(`http://localhost:3001/bookings/${bookingId}`,{status:"checkedin"})
}



  handleBookingDelete = (bookingId) => {
    const filteredBooking = this.state.bookings.filter((completed) => {
        return completed._id !== bookingId
    })
    this.setState({
      bookings: filteredBooking
    })
    Axios.delete(`http://localhost:3001/bookings/${bookingId}`, this.state.config)
}

 

 
  
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
            <h1> <p>Bookngs in our hotel </p></h1>
            <Table id='featuretable'>
                    <thead className="table-dark">
                        <th>Guest</th>
                        <th>Name</th>
                        <th>CheckIn Date</th>
                        <th>CheckOut Date</th>
                        <th>Make CheckIn</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                    {
                            this.state.bookings.map((booking =>
                        <tr key={booking._id}>

                            <td>
                            <div className="image_wrap">
                              <img src={`http://localhost:3001/uploads/${booking.guest.image}`}  width='200px' height='200px'/>
                            </div>
                            </td>
                            <td>{booking.guest.fullname}</td>
                            <td>{booking.checkin}</td>
                            <td>{booking.checkout}</td>
                           <td><Button size='sm' color='warning' onClick={() => this.handleBookingUpdate(booking._id)} >CheckIn</Button></td> 
                           <td> <Button size='sm' color='danger'  onClick={() => this.handleBookingDelete(booking._id)}>Delete</Button></td>
                        </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </Container>
            </React.Fragment>
           
        )
    }
}
