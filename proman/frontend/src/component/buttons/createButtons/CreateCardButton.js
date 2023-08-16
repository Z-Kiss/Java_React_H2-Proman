import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import CreatePopoverForCard from "../../popup/CreatePopoverForCard";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";
export default function CreateCardButton({boardColumnId, columnColor, textColor}){

    const [payload, setPayload] = useState({boardColumnId: boardColumnId, bgColor: columnColor, textColor:textColor});
    const [show, setShow] = useState(false);
    const stateOfBoards = useBoards();
    const setStateOfBoards = useSetBoards();

    const addNewCard = async (e) =>{
        e.preventDefault();
        await createNewCard(payload)
        setShow(false);
    }
    const createNewCard = async (payload) => {
        const newCard = await createCardInDatabase(payload);
        if (newCard) {
            const updatedState = updateStateWithNewCard(newCard);
            setStateOfBoards(updatedState);
        } else {
                alert("Some problem occurred with the Server try again")
        }
    }
    const createCardInDatabase = async (payload) => {
        let response = await fetch("/card", {
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
    const updateStateWithNewCard = (props) => {
        //boardColumnId is the id of the BoardColumn that contains the Card

        const {boardColumnId, card} = props;
        const copyOfState = [...stateOfBoards]
        return copyOfState.map(board => {
            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === boardColumnId) {

                        return {...boardColumn, cards: [...boardColumn.cards, card]}
                    }
                    return boardColumn
                })
            }
        })
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setPayload(prevState => ({
            ...prevState,[name]:value}));
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
            overlay={CreatePopoverForCard(handleChange, addNewCard)}>
            <Button variant={"outline-dark btn-sm"} className={"mx-1"}>{"+"}</Button>
        </OverlayTrigger>
    )
}
