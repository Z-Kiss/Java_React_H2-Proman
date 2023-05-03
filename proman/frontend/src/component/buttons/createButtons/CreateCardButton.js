import Button from "react-bootstrap/Button";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import {usePayloadGenerator} from "../../../context/PayloadGeneratorProvider";
import CreatePopoverForCard from "../../popup/CreatePopoverForCard";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";
import {useUser} from "../../../context/UserProvider";
export default function CreateCardButton({parentComponentId, columnColor, textColor}){

    const [payload, setPayload] = useState({bgColor: columnColor, textColor:textColor});
    const [show, setShow] = useState(false);
    const payloadGenerator = usePayloadGenerator()
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
        let response = await fetch("/card/create", {
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
            overlay={CreatePopoverForCard(handleChange, addNewCard)}>
            <Button variant={"outline-dark btn-sm"} className={"mx-1"}>{"+"}</Button>
        </OverlayTrigger>
    )
}
