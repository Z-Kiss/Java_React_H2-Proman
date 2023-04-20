import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function InputFieldForPopover({handleChange}){
    return(
        <Form.Group className={"d-flex mx-auto align-content-center justify-content-around"} >
            <Form.Control required={true} onChange={handleChange} name={"title"} className={"mb-3 w-50"} type="text"/>
            <Button size={"sm"} className={"h-50 m-1"}  type={"submit"} >ok</Button>
        </Form.Group>
    )
}
