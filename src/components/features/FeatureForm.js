import React, { Component } from 'react'
import { Form, Input, Button, FormGroup } from 'reactstrap'

export default class FeatureForm extends Component {


    render() {
        const { currentFeature, handleCurrentFeatureChange, handleFeatureSubmit } = this.props
        return (
            <div>
                <Form onSubmit={handleFeatureSubmit}>
                    <FormGroup>
                        <Input type='text' placeholder='add feature'
                            value={currentFeature}
                            onChange={(e) => handleCurrentFeatureChange(e.target.value)} />
                    </FormGroup>
                    <Button block color='primary'>Add</Button>
                </Form>
            </div>
        )
    }
}
