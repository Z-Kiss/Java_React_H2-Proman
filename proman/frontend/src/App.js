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
    const [modalContent, setModalContent] = useState("welcome");
    const [show, setShow] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [boards, setBoards] = useState([]);
    const getBoards = useGetBoards();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initUserBoards = async () =>{
        const boards = await getBoards.ofUser()
        if(boards === undefined){
            alert("Some problem occurred with the Server try again");
        }else {
            setBoards(boards);
        }
    }
    const initGuestBoards = async () =>{
        const boards = await getBoards.ofGuest();
        if(boards === undefined){
            alert("Some problem occurred with the Server try again");
        }else {
            setBoards(boards);
        }
    }

    useEffect(() => {
        if (loggedInUser === null) {
            initGuestBoards();
        } else {
            initUserBoards();
        }
    }, [loggedInUser]);

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        loggedInUser: loggedInUser,
        setLoggedInUser: setLoggedInUser,
        handleShow: handleShow,
        handleClose: handleClose,
    };

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
