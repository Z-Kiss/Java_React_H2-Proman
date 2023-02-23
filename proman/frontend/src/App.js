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
    const [boards, setBoards] = useState([])
    const brightBackground = ["bg-light","bg-warning","bg-info"]
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initBoardsGuest = async () =>{
        const response = await fetch("board/get-all-guest-boards")
        if(response.status === 200){
            setBoards(await response.json())
        }else{
            console.log("nope")
        }
    }
    const initBoardsUser = async () =>{
        const response = await fetch("board/get-all-boards-by-user")
        if(response.status === 200){
            setBoards(await response.json())
        }else{
            console.log("nope")
        }
    }




    useEffect(() => {
        if(loggedInUser === null){
            initBoardsGuest();
        } else{
            initBoardsUser();
        }
    },[loggedInUser])

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        loggedInUser: loggedInUser,
        setLoggedInUser: setLoggedInUser,
        handleShow: handleShow,
        handleClose: handleClose,
    }
    const createBoardProps ={
        initBoardsUser: initBoardsUser
    }

    return (
      <>

          <Navbar props={props} createBoardProps={createBoardProps} />
          <ModalContainer props={props}  />
          <Boards boards={boards} props={props} />

      </>
    )
}
