import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";


export default function UserButtons({props}) {

    const {setLoggedInUser, setModalContent, loggedInUser} = props

    const handleShow = () => {
        props.handleShow();
    }

    function logout() {
        fetch("/user/logout");
        setLoggedInUser(null);
    }

    function openLoginModal() {
        setModalContent("login");
        handleShow();
    }

    function openRegisterModal() {
        setModalContent("register");
        handleShow();
    }

    if (loggedInUser !== null) {
        return (<>
            <Button className={"mx-1"} onClick={logout}>Logout</Button>
            <Button className={"mx-1"}>{loggedInUser}</Button>
        </>);
    } else {
        return (
            <>
                <Button onClick={openLoginModal} className={"mx-1"}>Login</Button>
                <Button onClick={openRegisterModal} className={"mx-1"}>Register</Button>
            </>);
    }

}