import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.handleHide.bind(this)}
                container={this}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Contained Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
                    ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.register.bind(this)}>Register</Button>
                    <Button onClick={this.handleHide.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
            );
    }
    handleHide() {
        this.setState({
            showModal: false
        });
    }

    showModal() {
        this.setState({
            showModal: true
        });
    }
    register() {
        this.handleHide();
        this.props.register();
    }
};

export default RegisterModal