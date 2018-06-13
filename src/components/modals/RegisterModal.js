import React from 'react';
import { Modal, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import wave from '../../assets/wave.png';
import arrow from '../../assets/arrow.png';
import '../../styles/modal.css';

export const RegisterModal = (props) => {
        return (
            <Modal
                show={props.showModal}
                onHide={props.closeModal}
                aria-labelledby="contained-modal-title">
                <Image className="wave" src={wave} />
                <div className="modal_info">
                    <span className="invite">{props.currLang.new_user} <br/>{props.currLang.create}</span>
                    <p className="sign_up" onClick={props.registerUser} >{props.currLang.sign_up} <Image className="modal_arrow" src={arrow} /></p>
                </div>
            </Modal>
        );
};

RegisterModal.propTypes = {
    redirectTo: PropTypes.func
};