import React, { Component } from 'react'
import Navigation from './Navigation';
import { CardGroup,Card, Col, Row,Container,Button } from 'reactstrap'
import Axios from 'axios';

export default class Gallery extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
           gallery: [],
           config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        },
        }
      }
    
      componentDidMount() {
        Axios.get('http://localhost:3001/hotels/gallery/hotel',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({gallery:  data});
          console.log("data fecth");
         
        }).catch(error => console.log(error.response));
      }
    
    render() {
        return (
            <React.Fragment>
            <div>
            <Navigation/>
            <h1>gallery</h1>
            <Container className='mt-4'>
            <Row>
            {

              this.state.gallery.map((pop => 
                <div className="Col-md-4" id="product">
                <figure className="card card-product">
                 
                  <div className="image_wrap">
                    <img src={`http://localhost:3001/hotels/${pop.image}`} width='300px'/>
                  </div>
                  <figcaption class="info-wrap">
              <h4 class="title">{pop.image}</h4>
              <Button size='sm' color='danger'>Delete</Button>
                  </figcaption>
                </figure>
              </div>

                ))
            }
             
           </Row>

            </Container>
            </div>
            </React.Fragment>
        )
    }
}
