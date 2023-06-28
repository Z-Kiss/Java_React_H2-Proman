import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import CreatePopover from "../../popup/CreatePopover";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";
import {useUser} from "../../../context/UserProvider";

export default function CreateBoardButton() {
    const user = useUser();
    const [payload, setPayload] = useState({bgColor: "bg-primary"});
    const [show, setShow] = useState(false);
    const stateOfBoards = useBoards();
    const setStateOfBoards = useSetBoards();
    const brightBackground = ["bg-light", "bg-warning", "bg-info"];

    const addNewBoard = async e => {
        e.preventDefault();
        await createNewBoard(payload)
        setShow(false);
    }

    const createNewBoard = async () => {
        pickTextColor();
        putUserIntoPayload();
        const newBoard = await createBoardInDatabase();
        if (newBoard) {
            const updatedState = updateStateWithNewBoard(newBoard);
            setStateOfBoards(updatedState);
        } else {
            if (user.userName === null) {
                alert("You are not Logged in")
            } else {
                alert("Some problem occurred with the Server try again")
            }
        }
    }
    const createBoardInDatabase = async () => {
        const response = await fetch("/board/create", {
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
    const updateStateWithNewBoard = (props) => {
        const {board} = props
        return [...stateOfBoards, board]
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

    const putUserIntoPayload = () => {
        setPayload(prevState => ({
            ...prevState, userId: user.userId
        }))
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
