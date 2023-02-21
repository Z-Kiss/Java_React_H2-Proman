import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {createRef, useState} from "react";

import {createPortal} from "react-dom";



export function RegisterModal({props, payload, handleChange}) {
    const {handleClose, setLoggedInUser} = props

     const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch("/user/register",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(payload)
        })
         if(response.status === 200){
             setLoggedInUser(await response.json())
         }else {
             console.log("nope")
         }
         handleClose();
    }

    return (<>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name={"name"} type="text" placeholder="Enter Name" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name={"email"} type="email" placeholder="Enter email" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name={"password"} type="password" placeholder="Password" onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={(e) => registerUser(e)} variant="primary">Submit</Button>
            </Modal.Footer>
    </>)




}
