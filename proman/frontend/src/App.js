import * as React from 'react'
import {useState} from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/modal/ModalContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Table from "./component/table/Table";
import DragAndDropProvider from "./context/DragAndDropProvider";
import PayloadGeneratorProvider from "./context/PayloadGeneratorProvider";
import AboutPage from "./component/page/AboutPage";
import {Route, Routes} from "react-router-dom";


export default function App() {
    const [modalContent, setModalContent] = useState("welcome");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        handleShow: handleShow,
        handleClose: handleClose,
    };


    return (
        <>
            <PayloadGeneratorProvider>
                <DragAndDropProvider>
                    <Navbar props={props}/>
                    <ModalContainer props={props}/>
                    <Routes>
                        <Route path={"/"} element={<Table/>}/>
                        <Route path={"/about"} element={<AboutPage/>}/>
                    </Routes>
                </DragAndDropProvider>
            </PayloadGeneratorProvider>
        </>
    )
}
