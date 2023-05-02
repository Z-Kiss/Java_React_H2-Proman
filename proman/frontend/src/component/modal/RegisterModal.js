import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";

import {useRegister} from "../../context/UserProvider";

export function RegisterModal({handleClose}) {

    const [payload, setPayload] = useState({});
    const register = useRegister();

    const registerUser = async (e) => {
        e.preventDefault();
        register(payload);
        handleClose();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState, [name]: value
        }))
        console.log(payload)
    }

    return (<>
        <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Form onSubmit={registerUser}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name={"name"} required={true} type="text" placeholder="Enter Name"
                                  onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name={"email"} required={true} type="email" placeholder="Enter email"
                                  onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name={"password"} required={true} type="password" placeholder="Password"
                                  onChange={handleChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type={"submit"} variant="primary">Submit</Button>
            </Modal.Footer>
        </Form>
    </>)
}
