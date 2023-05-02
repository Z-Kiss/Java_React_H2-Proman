import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import {useCreate} from "../../../context/CreateComponentProvider";
import CreatePopover from "../../popup/CreatePopover";
import {usePayloadGenerator} from "../../../context/PayloadGeneratorProvider";
import {useUser} from "../../../context/UserProvider";
export default function CreateBoardButton({parentComponentId}){

    const [payload, setPayload] = useState({bgColor:"bg-primary"});
    const [show, setShow] = useState(false);
    const create = useCreate();
    const payloadGenerator = usePayloadGenerator()
    const createNewBoard = async (e) =>{
        e.preventDefault();
        create.newBoard(payload)
        setShow(false);
    }

    const handleChange = (e) =>{
        payloadGenerator.forNewObject(e,parentComponentId,payload,setPayload);
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
            overlay={CreatePopover(handleChange, createNewBoard)}>
            <Button variant={"primary"} className={"mx-1"}>{"Add Board"}</Button>
        </OverlayTrigger>
    )
}
