import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import CreatePopover from "../../popup/CreatePopover";
import {usePayloadGenerator} from "../../../context/PayloadGeneratorProvider";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";
import {useUser} from "../../../context/UserProvider";
export default function CreateColumnButton({parentComponentId}){

    const [payload, setPayload] = useState({bgColor:"bg-primary"});
    const [show, setShow] = useState(false);
    const payloadGenerator = usePayloadGenerator()
    const stateOfBoard = useBoards();
    const setStateOfBoards = useSetBoards()
    const user = useUser();

    const addNewColumn = async e =>{
        e.preventDefault();
        await createNewColumn(payload)
        setShow(false);
    }
    const createNewColumn = async (payload) => {
        const newColumn = await createColumnInDatabase(payload);
        if (newColumn) {
            const updatedState = updateStateWithNewColumn(newColumn);
            setStateOfBoards(updatedState);
        } else {
            if(user === null){
                alert("You are not Logged in")
            }else{
                alert("Some problem occurred with the Server try again")
            }
        }
    }
    const createColumnInDatabase = async (payload) => {

        let response = await fetch("/board-column/create", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            return undefined
        }
    }
    const updateStateWithNewColumn = (props) => {
        //boardId is the id of the Board that contains the boardColumn

        const {boardId, boardColumn} = props;

        return stateOfBoard.map(board => {
            if (board.id === boardId) {
                return {...board, boardColumns: [...board.boardColumns, boardColumn]};
            }
            return board;
        })
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
            overlay={CreatePopover(handleChange, addNewColumn)}>
            <Button variant={"outline-dark"} className={"mx-1"}>{"Add Column"}</Button>
        </OverlayTrigger>
    )
}
