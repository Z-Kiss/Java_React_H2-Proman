import Modal from 'react-bootstrap/Modal';
import {createPortal} from "react-dom";
import {RegisterModal} from "./RegisterModal";
import LoginModal from "./LoginModal";

export default function ModalContainer({props}) {

    const {modalContent, show, handleClose} = props

    return createPortal(show &&
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                {modalContent === "register"
                    ? <RegisterModal handleClose={handleClose}/>
                    : modalContent === "login"
                        ? <LoginModal handleClose={handleClose}/>
                        :<></>}
            </Modal>
        </>, document.getElementById("modal")
    );
}
