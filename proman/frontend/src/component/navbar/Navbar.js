import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import UserButtons from "../buttons/UserButtons";
import CreateBoardButton from "../buttons/createButtons/CreateBoardButton";
import SearchField from "./SearchField";


function NavBar({props}) {


    return (
        <Navbar bg="dark" variant={"dark"} expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Proman</Navbar.Brand>
                <Navbar.Brand href="/about">About</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Container className={"d-flex mx-auto"}>
                        <CreateBoardButton/>
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

export default NavBar;
