import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import {useCreate} from "../../context/CreateComponentProvider";
import CreatePopover from "../popup/CreatePopover";
import {usePayloadGenerator} from "../../context/PayloadGeneratorProvider";
export default function CreateCardButton({parentComponentId}){

    const [payload, setPayload] = useState({bgColor:"bg-primary"});
    const [show, setShow] = useState(false);

    const payloadGenerator = usePayloadGenerator()
    const create = useCreate();

    const createNewCard = async (e) =>{
        e.preventDefault();
        create.newCard(payload)
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
            overlay={CreatePopover(handleChange, createNewCard)}>
            <Button variant={"outline-dark btn-sm"} className={"mx-1"}>{"+"}</Button>
        </OverlayTrigger>

    )

}
