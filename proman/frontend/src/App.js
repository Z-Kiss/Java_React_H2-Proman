import * as React from 'react'
import {useEffect, useState} from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/modal/ModalContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Boards from "./component/table/Table";
import DragAndDropProvider from "./context/DragAndDropProvider";
import PayloadGeneratorProvider from "./context/PayloadGeneratorProvider";
import {useUser} from "./context/UserProvider";
import {useBoards, useSetBoards} from "./context/BoardProvider";


export default function App() {
    const [modalContent, setModalContent] = useState("welcome");
    const [show, setShow] = useState(true);
    const user = useUser();
    const boards = useBoards();
    const setBoards = useSetBoards();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchBoards = async (user) => {
        const response = await fetch(`/board/get-boards-by-id/${user.userId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            setBoards(await response.json());
        }
    }

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        handleShow: handleShow,
        handleClose: handleClose,
    };

    useEffect(() =>{
        if(user.userId !== null){
            fetchBoards(user)
        }
    },[user])


    return (
        <>
                <PayloadGeneratorProvider>
                    <DragAndDropProvider currentState={boards} setState={setBoards}>
                        <Navbar props={props}/>
                        <ModalContainer props={props}/>
                        <Boards boards={[...boards]} props={props}/>
                    </DragAndDropProvider>
                </PayloadGeneratorProvider>
        </>
    )
}
