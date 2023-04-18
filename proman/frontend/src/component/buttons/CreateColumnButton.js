import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import {useCreate} from "../../context/CreateComponentProvider";
import CreatePopover from "../popup/CreatePopover";
import {usePayloadGenerator} from "../../context/PayloadGeneratorProvider";
export default function CreateColumnButton({parentComponentId}){

    const [payload, setPayload] = useState({bgColor:"bg-primary"});
    const [show, setShow] = useState(false);

    const payloadGenerator = usePayloadGenerator()
    const create = useCreate();

    const createNewColumn = async (e) =>{
        e.preventDefault();
        create.newColumn(payload)
        setShow(false);
    }

    const handleChange = (e) =>{
       payloadGenerator.forNewObject(e, parentComponentId, payload, setPayload)
    }

    const toggleShow = () => {
        setShow(!show)
    }

    return(
        <OverlayTrigger
            trigger="click"
            rootClose
            placement={"right"}
            show={show}
            onToggle={toggleShow}
            overlay={CreatePopover(handleChange, createNewColumn)}>
            <Button variant={"outline-dark"} className={"mx-1"}>{"Add Column"}</Button>
        </OverlayTrigger>

    )

}