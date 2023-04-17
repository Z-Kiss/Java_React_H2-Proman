import {InputGroup, Popover} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreatePopOver (handleChange, handleSubmit){
    return(
        <Popover >
        <Popover.Header  as="h3">Pick a Name and Color</Popover.Header>
        <Popover.Body >
            <Form onSubmit={handleSubmit}>
                <Form.Group className={"d-flex mx-auto align-content-center justify-content-around"} >
                    <Form.Control required={true} onChange={handleChange} name={"title"} className={"mb-3 w-50"} type="text"/>
                    <Button size={"sm"} className={"h-50 m-1"}  type={"submit"} >ok</Button>
                </Form.Group>

                <InputGroup>
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
            </Form>
        </Popover.Body>
    </Popover>)
}
