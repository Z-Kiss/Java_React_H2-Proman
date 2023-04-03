import Button from "react-bootstrap/Button";
import {InputGroup, OverlayTrigger, Popover} from "react-bootstrap";
import { useState} from "react";
import Form from "react-bootstrap/Form";
export default function CreateComponentButton(props){

    const {createComponentProps, parentComponentId} = props;

    const {createComponent, placement,  buttonStyle, buttonTitle, url } = createComponentProps

    const {createNewObject, initBoardsUser} = createComponent

    const [payload, setPayload] = useState({bgColor:"bg-primary"});
    const [show, setShow] = useState(false);

    const brightBackground = ["bg-light","bg-warning"]


    const addNewComponent = async (e) =>{
        e.preventDefault();

        const response = await createNewObject(payload,url)

        if(response.status === 200){
            initBoardsUser();
            setPayload({bgColor: "bg-primary"})
        }
        setShow(false);
    }



    const handleChange = e =>{

        if(parentComponentId !== undefined){
            setPayload(prevState => ({
                ...prevState,id: parentComponentId}))
        }

        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState,[name]:value}))

        pickTextColor();

    }

    const pickTextColor = () =>{
        if (brightBackground.some((color) => (color === payload.bgColor))){

            setPayload(prevState => ({
                ...prevState,textColor: "text-dark"
            }))
        } else {

            setPayload(prevState => ({
                ...prevState,textColor: "text-white"
            }))
        }
    }


    const toggleShow = () => {
        setShow(!show)
    }

    return(
        <OverlayTrigger
        trigger="click"
        rootClose
        placement={placement}
        show={show}
        onToggle={toggleShow}
        overlay={
            <Popover >
                <Popover.Header  as="h3">Pick a Name and Color</Popover.Header>
                <Popover.Body >
                    <Form onSubmit={addNewComponent}>
                        <Form.Group className={"d-flex mx-auto align-content-center justify-content-around"} >
                            <Form.Control required={true} onChange={handleChange} name={"title"} className={"mb-3 w-50"} type="text"/>
                            <Button size={"sm"} className={"h-50 m-1"}  type={"submit"} >ok</Button>
                        </Form.Group>

                            <InputGroup>
                                <InputGroup.Radio autoFocus value={"bg-primary"} name={"bgColor"} className={"bg-primary checkboxes"} onChange={handleChange}/>
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
                    </Form>
                </Popover.Body>
            </Popover>
        }  >
            <Button variant={buttonStyle} className={"mx-1"}>{buttonTitle}</Button>
    </OverlayTrigger>
     
    )

}
