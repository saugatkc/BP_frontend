import React, { Component } from 'react'
import { CardGroup,Card, Col, Row,CardBody, CardTitle, CardSubtitle,CardText,Button,CardImg, Container } from 'reactstrap'

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
    Axios.get('http://localhost:3001/hotels/gallery/hotel',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

 

 
  
    render() {
      console.log(this.state.popular)
        return (
           <div className="container">
             <p>Old </p>
           
           <Row>
            {

              this.state.popular.map((pop => 
                <div className="Col-md-4" id="gallery">
                <figure className="card card-gallery">
                 
                  <div className="image_wrap">
                    <img src={`http://localhost:3001/gallery/${pop.image}`} width="300px" height="200px" />
                  </div>
                  <figcaption class="info-wrap">
              <h4 class="title">{pop._id}</h4>
                  </figcaption>
                </figure>
              </div>

                ))
              
            
            }

            
             
           </Row>
           <hr></hr>
                
            </div>
          
          
           
        )
    }
}
