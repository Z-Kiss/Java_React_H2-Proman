import {Popover} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ColorPickerForPopover from "./ColorPickerForPopover";
import InputFieldForPopover from "./InputFieldForPopover";

export default function CreatePopover (handleChange, handleSubmit){
    return(
        <Popover >
        <Popover.Header  as="h3">Pick a Name and Color</Popover.Header>
        <Popover.Body >
            <Form onSubmit={handleSubmit}>
               <InputFieldForPopover handleChange={handleChange}/>
               <ColorPickerForPopover handleChange={handleChange}/>
            </Form>
        </Popover.Body>
    </Popover>)
}
