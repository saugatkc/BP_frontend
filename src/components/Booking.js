import React, { Component } from 'react'
import Navigation from './Navigation';
import { Table } from 'reactstrap'
import { Container ,Button} from 'reactstrap'
import Axios from 'axios';

export default class Booking extends Component {

  constructor(props) {
    super(props)
  
    this.state = {

      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
       completeds: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/bookings/hotel/hotelbooking/completed',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({completeds:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

 

 
  
    render() {
      console.log(this.state.popular)
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
                            this.state.completeds.map((completed =>
                        <tr>

                            <td>
                            <div className="image_wrap">
                              <img src={`http://localhost:3001/uploads/${completed.guest.image}`}/>
                            </div>
                            </td>
                            <td>{completed.guest.fullname}</td>
                            <td>{completed.checkin}</td>
                            <td>{completed.checkout}</td>
                           <td><Button size='sm' color='warning' >CheckIn</Button></td> 
                           <td> <Button size='sm' color='danger'>Delete</Button></td>
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
