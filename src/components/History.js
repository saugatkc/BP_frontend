import React, { Component } from 'react'
import { CardGroup,Card, Col, Row,CardBody, CardTitle, CardSubtitle,CardText,Button,CardImg, Container } from 'reactstrap'
import Navigation from './Navigation';
import { Table } from 'reactstrap'
import Axios from 'axios';

export default class  extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      checkin: '',
      image: '',
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
       popular: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/bookings/hotel/hotelbooking/completed',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

 

 
  
    render() {
      console.log(this.state.popular)
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
            <h1> <p>Stays in our hotel </p></h1>
            <Table id='featuretable'>
                    <thead className="table-dark">
                        <th>Guest</th>
                        <th>Name</th>
                        <th>checkin</th>
                        <th>checkout</th>
                    </thead>
                    <tbody>
                    {
                            this.state.popular.map((pop =>
                        <tr>

                            <td>
                            <div className="image_wrap">
                              <img src={`http://localhost:3001/uploads/${pop.guest.image}`}/>
                            </div>
                            </td>
                            <td>{pop.guest.fullname}</td>
                            <td>{pop.checkin}</td>
                            <td>{pop.checkout}</td>
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
