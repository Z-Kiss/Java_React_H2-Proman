import * as React from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/navbar/ModalContainer";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Boards from "./component/board/Table";


export default function App() {
    const [modalContent, setModalContent] = useState(null)
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [boards, setBoards] = useState([])
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

    const createNewObject = async (payload,url) =>{
        const response = await fetch(url,{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(payload)
        })
        return response;
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

    const createComponentProps = {
        initBoardsUser: initBoardsUser,
        createNewObject: createNewObject,
    }

    const createBoardProps ={
        createComponent:createComponentProps,
        placement:"bottom",
        buttonStyle:"primary",
        buttonTitle:"Create Board",
        url:"/board/create"
    }
    const createColumnProps ={
        createComponent:createComponentProps,
        placement:"right",
        buttonStyle:"outline-dark",
        buttonTitle:"Add Column",
        url:"/boardcolumn/create"
    }
    const createCardProps ={
        createComponent:createComponentProps,
        placement:"left",
        buttonStyle:"outline-dark btn-sm",
        buttonTitle:"+",
        url:"/card/create"
    }

    return (
      <>

          <Navbar props={props} createBoardProps={createBoardProps} />
          <ModalContainer props={props}  />
          <Boards boards={boards} props={props} createColumnProps={createColumnProps} createCardProps={createCardProps} />

      </>
    )
}
