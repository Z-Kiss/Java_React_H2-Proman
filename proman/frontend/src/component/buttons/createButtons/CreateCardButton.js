import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import {useCreate} from "../../../context/CreateComponentProvider";
import {usePayloadGenerator} from "../../../context/PayloadGeneratorProvider";
import CreatePopoverForCard from "../../popup/CreatePopoverForCard";
export default function CreateCardButton({parentComponentId, columnColor, textColor}){

    const [payload, setPayload] = useState({bgColor: columnColor, textColor:textColor});
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
            overlay={CreatePopoverForCard(handleChange, createNewCard)}>
            <Button variant={"outline-dark btn-sm"} className={"mx-1"}>{"+"}</Button>
        </OverlayTrigger>
    )
}
