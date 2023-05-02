import Button from "react-bootstrap/Button";
import {useLogout, useUser} from "../../context/UserProvider";
import {useSetBoards} from "../../context/BoardProvider";


export default function UserButtons({props}) {

    const {setModalContent} = props;
    const user = useUser();
    const logout = useLogout();
    const setBoards = useSetBoards();

    const handleShow = () => {
        props.handleShow();
    }

    const openLoginModal = () => {
        setModalContent("login");
        handleShow();
    }

    const openRegisterModal = () => {
        setModalContent("register");
        handleShow();
    }

    const handleLogout = () =>{
        logout();
        setBoards([]);
    }


    if (user.userName !== null) {
        return (<>
            <Button className={"mx-1"} onClick={handleLogout}>Logout</Button>
            <Button className={"mx-1"}>{user.userName}</Button>
        </>);
    } else {
        return (
            <>
                <Button onClick={openLoginModal} className={"mx-1"}>Login</Button>
                <Button onClick={openRegisterModal} className={"mx-1"}>Register</Button>
            </>);
    }

}