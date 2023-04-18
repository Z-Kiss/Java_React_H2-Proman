import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserButtons from "../buttons/UserButtons";
import {useEffect} from "react";
import CreateBoardButton from "../buttons/CreateBoardButton";
import SearchField from "./SearchField";



function NavScrollExample({props}) {





    const {setLoggedInUser} = props;

    async function initLoggedInUser() {
        const response = await fetch("/user")
        if (response.status === 200) {
            setLoggedInUser(await response.json());
        } else {
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

                    <Container className={"d-flex mx-auto"}>
                        <CreateBoardButton />
                        <SearchField/>
                    </Container>

                    <Container fluid className={"d-flex justify-content-sm-end"}>
                        <UserButtons props={props}/>
                    </Container>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default NavScrollExample;