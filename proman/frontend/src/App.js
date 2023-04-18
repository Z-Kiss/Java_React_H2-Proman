import * as React from 'react'
import {useEffect, useState} from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/modal/ModalContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Boards from "./component/table/Table";
import DragAndDropProvider from "./context/DragAndDropProvider";
import DeleteComponentProvider from "./context/DeleteComponentProvider";
import CreateComponentProvider from "./context/CreateComponentProvider";
import PayloadGeneratorProvider from "./context/PayloadGeneratorProvider";




export default function App() {
    const [modalContent, setModalContent] = useState(null);
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [boards, setBoards] = useState([])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initBoardsGuest = async () => {
        const response = await fetch("/board/get-all-guest-boards")
        if (response.status === 200) {
            setBoards(await response.json());
        } else {
            console.log("nope")
        }
    }
    const initBoardsUser = async () => {
        const response = await fetch("/board/get-all-boards-by-user")
        if (response.status === 200) {
            setBoards(await response.json());
        } else {
            console.log("nope")
        }
    }


    useEffect(() => {
        if (loggedInUser === null) {
            initBoardsGuest();
        } else {
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




    return (
        <>
            <PayloadGeneratorProvider>
                <CreateComponentProvider currentState={boards} setState={setBoards}>
                    <DeleteComponentProvider currentState={boards} setState={setBoards}>
                        <DragAndDropProvider currentState={boards} setState={setBoards}>
                                <Navbar props={props}/>
                                <ModalContainer props={props}/>
                                <Boards boards={[...boards]} props={props} />
                        </DragAndDropProvider>
                    </DeleteComponentProvider>
                </CreateComponentProvider>
            </PayloadGeneratorProvider>
        </>
    )
}

