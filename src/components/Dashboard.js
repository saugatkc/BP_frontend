import React, { Component } from 'react'
import Navigation from './Navigation';
import { Table } from 'reactstrap'
import { Container ,Button} from 'reactstrap'
import Axios from 'axios';

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {

      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
       stayings: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/bookings/hotel/hotelbooking/staying',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({stayings:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

  handleBookingUpdate = (bookingId) => {
    const filteredBooking = this.state.stayings.filter((stay) => {
        return stay._id !== bookingId
    })
    this.setState({
      stayings: filteredBooking
    })
    Axios.put(`http://localhost:3001/bookings/${bookingId}`,{status:"completed"})
}

 

 
  
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
            <h1> <p>Guests Staying </p></h1>
            <Table id='featuretable'>
                    <thead className="table-dark">
                        <th>Guest</th>
                        <th>Name</th>
                        <th>CheckIn Date</th>
                        <th>CheckOut Date</th>
                        <th>Make CheckOut</th>
                    </thead>
                    <tbody>
                    {
                            this.state.stayings.map((stay =>
                        <tr>

                            <td>
                            <div className="image_wrap">
                              <img src={`http://localhost:3001/uploads/${stay.guest.image}`} width='200px' height='200px'/>
                            </div>
                            </td>
                            <td>{stay.guest.fullname}</td>
                            <td>{stay.checkin}</td>
                            <td>{stay.checkout}</td>
                           <td><Button size='sm' color='warning'onClick={() => this.handleBookingUpdate(stay._id)} >CheckOut</Button></td> 
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
