import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useLogin, useLoginAsGuest} from "../../context/UserProvider";


export default function LoginModal({handleClose}) {


    const [payload, setPayload] = useState({})
    const login = useLogin()
    const loginAsGuest = useLoginAsGuest();

    const loginAsUser = (e) =>{
        e.preventDefault()
        login(payload)
        handleClose();
    }

    const loginForGuest = () =>{
        loginAsGuest()
        handleClose();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState,[name]:value}))
    }

    return (<>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={loginAsUser}>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name={"email"} required={true} type="email" placeholder="Enter email" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name={"password"} required={true} type="password" placeholder="Password" onChange={handleChange}/>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer className={"d-flex justify-content-between"}>
                <Button  variant="primary" onClick={loginForGuest} >
                    Login as Guest
                </Button>
                <div>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type={"submit"} >
                        Submit
                    </Button>
                </div>
            </Modal.Footer>
            </Form>
        </>)
}
