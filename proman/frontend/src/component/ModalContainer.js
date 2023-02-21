
import Modal from 'react-bootstrap/Modal';
import {createPortal} from "react-dom";
import {RegisterModal} from "./RegisterModal";
import LoginModal from "./LoginModal";
import {useState} from "react";
export default function ModalContainer({props}) {

    const {modalContent, show, handleClose} = props

    const [payload, setPayload] = useState({});

    const handleChange = e =>{
        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState,[name]:value}))

    }

    return createPortal(show &&
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                {modalContent === "register"
                ? <RegisterModal props={props} payload={payload} handleChange={handleChange}/>
                : modalContent === "login"
                ? <LoginModal props={props} payload={payload} handleChange={handleChange} /> : <></>}
            </Modal>
        </>,document.getElementById("modal")
    );
}
