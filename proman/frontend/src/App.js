import * as React from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/navbar/ModalContainer";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Boards from "./component/board/Table";


export default function App() {
    const [modalContent, setModalContent] = useState(null)
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [boards, setBoards] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initBoards = async () =>{
        const response = await fetch("board/get-all-guest-boards")
        if(response.status === 200){
            setBoards(await response.json())
        }else{
            console.log("nope")
        }
    }

    useEffect(() => {
        initBoards()
    },[])

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
          <Boards boards={boards} />

      </>
    )
}

// setModalContent={setModalContent} handleShow={handleShow} handleClose={handleClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}
// modalContent={modalContent} show={show} handleClose={handleClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}