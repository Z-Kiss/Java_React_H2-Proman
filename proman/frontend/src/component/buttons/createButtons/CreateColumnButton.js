import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import CreatePopover from "../../popup/CreatePopover";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function CreateColumnButton({boardId}) {

    const payload = {boardId: boardId,title:"", bgColor: "bg-primary", textColor:""};
    const [show, setShow] = useState(false);
    const stateOfBoard = useBoards();
    const setStateOfBoards = useSetBoards();
    const brightBackground = ["bg-light", "bg-warning", "bg-info"];

    const addNewColumn = async e => {
        e.preventDefault();
        await createNewColumn()
        setShow(false);
    }
    const createNewColumn = async () => {
        pickTextColor();
        const newColumn = await createColumnInDatabase();
        if (newColumn) {
            const updatedState = updateStateWithNewColumn(newColumn);
            setStateOfBoards(updatedState);
        } else {
            alert("Some problem occurred with the Server try again")
        }
    }
    const createColumnInDatabase = async () => {

        let response = await fetch("/board-column", {
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

    const handleChange = (e) => {
        recordAttributeOfNewObject(e);
    }


    const recordAttributeOfNewObject = (e) => {
        const {name, value} = e.target;
        payload[name] = value
    }

    const pickTextColor = () => {
        if (brightBackground.some((color) => color === payload.bgColor)) {
            payload.textColor = "text-dark"
        } else {
            payload.textColor = "text-white"
        }
    };
    const toggleShow = () => {
        setShow(!show)
    }

    return (
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
