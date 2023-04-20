import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegisterModal({props, payload, handleChange}) {
    const {handleClose} = props

    const registerUser = async (e) => {
        console.log("haha")
        e.preventDefault()
        const response = await fetch("/user/register", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })

        if (response.status === 200) {
            alert("User Registered")
        } else {
            alert("Some problem occurred with the Server try again")
        }
        handleClose();
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
