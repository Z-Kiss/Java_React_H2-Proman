import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserButtons from "./UserButtons";
import {useEffect, useState} from "react";

function NavScrollExample({props}) {


   const {setLoggedInUser} = props;

    async function initLoggedInUser() {
        const response = await fetch("/user")
        if(response.status === 200){
            console.log(await response.json())
            setLoggedInUser(await response.json());
        }else {
            console.log("nope")
        }
    }

    useEffect(() => {
        initLoggedInUser();
    }, [])


    return (
        <Navbar bg="dark" variant={"dark"} expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Proman</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    </Nav>
                    <Container className={"d-flex mx-auto"}>
                        <Button className={"mx-1"}>Create Table</Button>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search for Board"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>

                    </Container>
                    <Container fluid className={"d-flex justify-content-sm-end"}>
                        <UserButtons  props={props}/>
                    </Container>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;