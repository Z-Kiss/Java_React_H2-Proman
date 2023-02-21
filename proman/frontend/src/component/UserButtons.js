import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

import React from "react";


export default function UserButtons({props}) {

    const {setLoggedInUser, setModalContent,loggedInUser,modalContent} = props


    const handleShow = () =>{
        props.handleShow();
    }

    function logout() {
        fetch("/user/logout");
        setLoggedInUser(null);
    }
    function openLoginModal(){
        setModalContent("login");
        handleShow();
        console.log(modalContent)
    }
    function openRegisterModal(){
        setModalContent("register");
        handleShow();
        console.log(modalContent)

    }



    return (loggedInUser !== null
            ?

            <>
                <NavDropdown title="Show Boards" id="navbarScrollingDropdown">
                    <NavDropdown.Item>Guest</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>Personal</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>All</NavDropdown.Item>
                </NavDropdown>
                <Button className={"mx-1"} onClick={logout}>Logout</Button>
                <Button className={"mx-1"}>{loggedInUser}</Button>
            </>
            :
            <>
                <Button onClick={openLoginModal}  className={"mx-1"}>Login</Button>
                <Button onClick={openRegisterModal} className={"mx-1"}>Register</Button>
            </>
    )
}