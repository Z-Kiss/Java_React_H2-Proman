import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import {useCreate} from "../../context/CreateComponentProvider";
import CreatePopOver from "../popup/CreatePopOver";
import {usePayloadGenerator} from "../../context/PayloadGeneratorProvider";
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
            overlay={CreatePopOver(handleChange, createNewBoard)}>
            <Button variant={"primary"} className={"mx-1"}>{"Add Board"}</Button>
        </OverlayTrigger>

    )

}