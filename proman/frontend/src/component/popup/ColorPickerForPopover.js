import {InputGroup} from "react-bootstrap";
export default function ColorPickerForPopover({handleChange}){

    return(
        <>
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
        </>
    )
}
