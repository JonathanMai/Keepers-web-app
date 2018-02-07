import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const RegisterModal = (props) => {
    console.log(props);
        return (
            <Modal
                show={props.showModal}
                onHide={props.closeModal}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        The user does not exists
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to create a new account?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.registerUser}>Register</Button>
                    <Button onClick={props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
};

RegisterModal.propTypes = {
    redirectTo: PropTypes.func
};