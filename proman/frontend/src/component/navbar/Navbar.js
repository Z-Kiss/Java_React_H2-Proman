import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import UserButtons from "../buttons/UserButtons";
import CreateBoardButton from "../buttons/createButtons/CreateBoardButton";
import SearchField from "./SearchField";
import {useNavigate} from "react-router-dom";


function NavBar({props}) {
    const navigate = useNavigate()

    const handleClick = (whereTo) =>{
        navigate(whereTo)
    }

    return (
        <Navbar bg="dark" variant={"dark"} expand="lg">
            <Container fluid>
                <Navbar.Brand onClick={() => handleClick('/')}>Proman</Navbar.Brand>
                <Navbar.Brand onClick={() => handleClick('/about')}>About</Navbar.Brand>
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
