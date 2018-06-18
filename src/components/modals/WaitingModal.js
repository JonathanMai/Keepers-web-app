import React from 'react';
import { Modal } from 'react-bootstrap';
import '../../styles/waitingModal.css';

/*
    This is stateless component for loading modal.
    It gets onShow and onHide functions from props and style
    the modal with loading animation circle. 
*/
export const WaitingModal = (props) =>  {
        return (
            <Modal
                show={props.showModal}
                onHide={props.closeModal}
                aria-labelledby="contained-modal-title">
                <Modal.Dialog>
                    <Modal.Body>
                        <div className="modal_loading">
                            <div className="loader active"></div>
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        );
};



