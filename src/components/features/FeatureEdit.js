import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap'

export default class FeatureEdit extends Component {

    handleSubmit = (e) => {
        this.props.toggle();
        this.props.updateFeature(this.props.feature);
    }

    render() {
        const { showEdit, toggle, feature } = this.props
        return (
            <React.Fragment>
                <Modal isOpen={showEdit} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Edit feature
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type='text'
                                    value={feature.name}
                                    onChange={(e) => this.props.handleFeatureNameChange(e.target.value)} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.handleSubmit}>Save</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}
