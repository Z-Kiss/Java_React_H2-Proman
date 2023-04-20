import {Popover} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputFieldForPopover from "./InputFieldForPopover";

export default function CreatePopoverForCard (handleChange, handleSubmit){
    return(
        <Popover >
            <Popover.Header  as="h3">Pick a Name</Popover.Header>
            <Popover.Body >
                <Form onSubmit={handleSubmit}>
                    <InputFieldForPopover handleChange={handleChange}/>
                </Form>
            </Popover.Body>
        </Popover>)
}
