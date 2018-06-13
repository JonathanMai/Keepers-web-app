import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import wave from '../../assets/wave.png';
import arrow from '../../assets/arrow.png';
import '../../styles/modal.css';

// PROPS.REGISTER
// PROPS.CLOSE
export const RegisterModal = (props) => {
        return (
            <Modal
                show={props.showModal}
                onHide={props.closeModal}
                aria-labelledby="contained-modal-title">
                <Image className="wave" src={wave} />
                <div className="modal_info">
                    <span>We notice that you are a new user, lets create a new account!</span>
                    <span>Sign Up <Image className="modal_arrow" onClick={props.registerUser} src={arrow} /></span>
                </div>
            </Modal>
        );
};

RegisterModal.propTypes = {
    redirectTo: PropTypes.func
};