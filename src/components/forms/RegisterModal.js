import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class RegisterModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.reducerA.showModal}
                onHide={this.handleHide.bind(this)}
                container={this}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        The user does not exists
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to create a new account? {console.log(this.props)}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.register.bind(this)}>Register</Button>
                    <Button onClick={this.handleHide.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
            );
    }
    handleHide() {
       this.props.setShowModal(false);
    }
    register() {
        this.handleHide();
        this.props.redirectTo();
        
    }
};

const mapFromStateToProps = (state) => {
    return {
        reducerA: state.reducerA
    };
};

const mapFromDispatchToProps = (dispatch) => {
    return {
        setShowModal: (val) => {
            dispatch({
                type: "SET_SHOW_MODAL",
                value: val
            });
        }
    };
};

export default connect(mapFromStateToProps, mapFromDispatchToProps)(RegisterModal)

RegisterModal.propTypes = {
    redirectTo: PropTypes.func
};