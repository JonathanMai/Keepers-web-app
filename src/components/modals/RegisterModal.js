import React from 'react';
import { Modal, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import wave from '../../assets/login/wave.png';
import arrow from '../../assets/login/arrow.png';
import '../../styles/modal.css';

/*
    This is stateless component for register modal.
    It gets onShow and onHide functions from props and style
    the modal with text and buttons. 
*/
export const RegisterModal = (props) => {
        return (
            <Modal
                show={props.showModal}
                onHide={props.closeModal}
                aria-labelledby="contained-modal-title">
                <Modal.Body>
                    <Image className="wave" src={wave} />
                    <div className="modal_info">
                        <span className="invite">{props.currLang.new_user} <br/>{props.currLang.create}</span>
                        <p className="sign_up" onClick={props.registerUser} >
                            {props.currLang.sign_up} 
                            <Image className="modal_arrow" src={arrow} />
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        );
};

RegisterModal.propTypes = {
    redirectTo: PropTypes.func
};