import React, { Component } from 'react'
import Navigation from './Navigation';
import { Row,Container,Button ,Form, FormGroup,CustomInput} from 'reactstrap'
import Axios from 'axios';
import FileUploadButton from './FileUploadButton'

export default class Gallery extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
           gallery: [],
           config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        },
        image: '',
        }
      }
    
      componentDidMount() {
        Axios.get('http://localhost:3001/hotels/gallery/get/images',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({gallery:  data});
          console.log("data fecth");
         
        }).catch(error => console.log(error.response));
      }

      handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

      uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload/hotel/gallery', data, this.state.config)
            .then((response) => {
                this.setState({
                    image: response.data.filename 
                })
            }).catch((err) => console.log(err.response))
    }

    addImage = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:3001/hotels/gallery', { image: this.state.image },
          this.state.config).then((response) => {
              this.setState({
                  Gallery: [...this.state.gallery, response.data],
                 
              })
          })
  }

      handleImageDelete = (imageId) => {
        const filteredImage = this.state.gallery.filter((image) => {
            return image._id !== imageId
        })
        this.setState({
          gallery: filteredImage
        })
        Axios.delete(`http://localhost:3001/hotels/gallery/${imageId}`, this.state.config)
    }
    
    render() {
        return (
            <React.Fragment>
            <div>
            <Navigation/>
            <Container className='mt-4'>
                        <Form>
                        <FormGroup>
                        <img className='img-thumbnail'
                                    width='400' src={`http://localhost:3001/gallery/${this.state.image}`}
                                    alt="profile" />
                                <CustomInput type='file' id='image'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <Button color='danger' onClick={this.addImage} block>Add To Gallery</Button>
                            </Form>
                            </Container>
            <h1>gallery</h1>
            <Container className='mt-4'>
            <Row>
            {

              this.state.gallery.map((pop => 
                <div className="images" id="product">
                <figure className="card card-product">
                 
                  <div className="image_wrap">
                    <img src={`http://localhost:3001/gallery/${pop.image}`} width='300px' height='300px'/>
                  </div>
                  <figcaption class="info-wrap">
              <h4 class="title">{pop.image}</h4>
              <Button size='sm' color='danger' onClick={() => this.handleImageDelete(pop._id)}>Delete</Button>
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
