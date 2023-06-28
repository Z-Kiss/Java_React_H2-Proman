import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import CreatePopover from "../../popup/CreatePopover";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function CreateColumnButton({boardId}) {

    const [payload, setPayload] = useState({boardId: boardId, bgColor: "bg-primary"});
    const [show, setShow] = useState(false);
    const stateOfBoard = useBoards();
    const setStateOfBoards = useSetBoards();
    const brightBackground = ["bg-light", "bg-warning"];

    const addNewColumn = async e => {
        e.preventDefault();
        await createNewColumn(payload)
        setShow(false);
    }
    const createNewColumn = async (payload) => {
        pickTextColor();
        const newColumn = await createColumnInDatabase(payload);
        if (newColumn) {
            const updatedState = updateStateWithNewColumn(newColumn);
            setStateOfBoards(updatedState);
        } else {
            alert("Some problem occurred with the Server try again")
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

    const handleChange = (e) => {
        recordAttributeOfNewObject(e);
    }


    const recordAttributeOfNewObject = (e) => {
        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState, [name]: value
        }));
    }

    const pickTextColor = () => {
        let textColor = ""
        if (brightBackground.some((color) => color === payload.bgColor)) {
            textColor = "text-dark"
        } else {
            textColor = "text-white"
        }
        setPayload(prevState => ({
            ...prevState,
            textColor: textColor
        }));
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
