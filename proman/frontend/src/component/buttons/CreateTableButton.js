import Button from "react-bootstrap/Button";

import {InputGroup, OverlayTrigger, Popover} from "react-bootstrap";
import { useState} from "react";
export default function CreateBoardButton({createBoardProps}){

    const initUserBoard = createBoardProps.initBoardsUser;
    const [payload, setPayload] = useState({});
    const [show, setShow] = useState(false);
    const brightBackground = ["bg-light","bg-warning","bg-info"]


    const pickTextColor = () =>{
        if (brightBackground.some((color) => (color === payload.bgColor))){

            setPayload(prevState => ({
                ...prevState,"textColor":"text-dark"}))
        } else {

            setPayload(prevState => ({
                ...prevState,"textColor":"text-white"
            }))
        }
    }
    const createNewBoard = async () =>{

        console.log(payload)
        const response = await fetch("/board/create",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(payload)
        })
        if(response.status === 200){
            initUserBoard();
            setPayload({})
        }

        setShow(false)
    }

    const handleChange = e =>{
        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState,[name]:value}))
        pickTextColor();
    }

    const toggleShow = () => {
        setShow(!show)
    }

    return(
        <OverlayTrigger
        trigger="click"
        rootClose
        placement={"bottom"}
        show={show}
        onToggle={toggleShow}
        overlay={
            <Popover >
                <Popover.Header as="h3">Pick a Name and Color</Popover.Header>
                <Popover.Body>
                    <div >
                        <input required onChange={(e) => handleChange(e)} name={"title"} className={"mb-3 w-75"} type="text"/>
                        <button onClick={createNewBoard} >ok</button>
                    </div>

                    <InputGroup >
                        <InputGroup.Radio value={"bg-primary"} name={"bgColor"} className={"bg-primary checkboxes"} onChange={handleChange}/>
                        <InputGroup.Radio value={"bg-secondary"} name={"bgColor"} className={"bg-secondary"} onChange={handleChange} />
                        <InputGroup.Radio value={"bg-success"} name={"bgColor"}  className={"bg-success"} onChange={handleChange} />
                        <InputGroup.Radio value={"bg-light"} name={"bgColor"}  className={"bg-light"} onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup >
                        <InputGroup.Radio value={"bg-danger"} name={"bgColor"}  className={"bg-danger"} onChange={handleChange} />
                        <InputGroup.Radio value={"bg-warning"} name={"bgColor"}  className={"bg-warning"} onChange={handleChange} />
                        <InputGroup.Radio value={"bg-info"} name={"bgColor"}  className={"bg-info"} onChange={handleChange} />
                        <InputGroup.Radio value={"bg-dark"} name={"bgColor"}  className={"bg-dark"} onChange={handleChange} />
                    </InputGroup>

                </Popover.Body>
            </Popover>
        }  >
            <Button className={"mx-1"}>Create Table</Button>
    </OverlayTrigger>
     
    )

}


{/*<Form>*/}
{/*    <div className="mb-3">*/}
{/*        <Form.Check*/}
{/*            inline*/}
{/*            label="1"*/}
{/*            name="group1"*/}
{/*            type={"radio"}*/}
{/*            */}
{/*        />*/}
{/*        <Form.Check*/}
{/*            inline*/}
{/*            label="2"*/}
{/*            name="group1"*/}
{/*            type={"radio"}*/}

{/*        />*/}
{/*    </div>*/}