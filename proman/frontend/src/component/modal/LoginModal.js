import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function LoginModal({props, payload, handleChange}) {

    const {handleClose, setLoggedInUser} = props

    const loginUser = async (e) =>{
        e.preventDefault()
        const response = await fetch("/user/login",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(payload)
        })
        if(response.status === 200){
            setLoggedInUser(await response.json())
        }else {
            alert("Wrong Email/Username combination")
        }
        handleClose();
    }

    return (<>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={loginUser}>
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
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type={"submit"} >
                    Submit
                </Button>
            </Modal.Footer>
            </Form>
        </>)
}
