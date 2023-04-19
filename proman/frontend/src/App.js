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
import {useGetBoards} from "./context/BoardProvider";


export default function App() {
    const [modalContent, setModalContent] = useState(null);
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [boards, setBoards] = useState([]);

    const getBoards = useGetBoards();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initUserBoards = async () =>{
        setBoards(await getBoards.ofUser());
    }
    const initGuestBoards = async () =>{
        setBoards(await getBoards.ofGuest());
    }

    useEffect(() => {
        if (loggedInUser === null) {
            initGuestBoards()
        } else {
            initUserBoards()
        }
    }, [loggedInUser])


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
                                <Boards boards={[...boards]} props={props}/>
                            </DragAndDropProvider>
                        </DeleteComponentProvider>
                    </CreateComponentProvider>
                </PayloadGeneratorProvider>

        </>
    )
}

