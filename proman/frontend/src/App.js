import * as React from 'react'
import Navbar from "./component/Navbar";
import ModalContainer from "./component/ModalContainer";
import { useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    const [modalContent, setModalContent] = useState(null)
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        loggedInUser: loggedInUser,
        setLoggedInUser: setLoggedInUser,
        handleShow: handleShow,
        handleClose: handleClose
    }
    return (
      <>

          <Navbar props={props} />
          <ModalContainer props={props}  />

      </>
    )
}

// setModalContent={setModalContent} handleShow={handleShow} handleClose={handleClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}
// modalContent={modalContent} show={show} handleClose={handleClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}