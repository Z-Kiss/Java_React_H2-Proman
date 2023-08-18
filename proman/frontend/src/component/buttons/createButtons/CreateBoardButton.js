import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import CreatePopover from "../../popup/CreatePopover";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";
import {useUser} from "../../../context/UserProvider";

export default function CreateBoardButton() {
    const user = useUser();
    const payload = {bgColor: "bg-primary", textColor: ""};
    const [show, setShow] = useState(false);
    const stateOfBoards = useBoards();
    const setStateOfBoards = useSetBoards();
    const brightBackground = ["bg-light", "bg-warning", "bg-info"];

    const addNewBoard = async e => {
        e.preventDefault();
        await createNewBoard();
        setShow(false);
    }

    const createNewBoard = async () => {
        pickTextColor();
        if (user.userName === null) {
            alert("You are not Logged in")
        } else {
            putUserIntoPayload();
            const newBoard = await createBoardInDatabase(payload);
            if (newBoard) {
                const updatedState = updateStateWithNewBoard(newBoard);
                setStateOfBoards(updatedState);
            } else {
                alert("Some problem occurred with the Server try again")
            }
        }
    }

    const createBoardInDatabase = async (payload) => {
        const response = await fetch("/board", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
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
    const updateStateWithNewBoard = (props) => {
        const {board} = props
        return [...stateOfBoards, board]
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

    const putUserIntoPayload = () => {
        payload.userId = user.userId;
    }

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <OverlayTrigger
            trigger="click"
            rootClose
            placement={"bottom"}
            show={show}
            onToggle={toggleShow}
            overlay={CreatePopover(handleChange, addNewBoard)}>
            <Button variant={"primary"} className={"mx-1"}>{"Add Board"}</Button>
        </OverlayTrigger>
    )
}
