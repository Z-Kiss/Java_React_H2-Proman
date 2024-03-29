
import Button from "react-bootstrap/Button";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function DeleteBoardButton({componentId, columnId, boardId}){

    const stateOfBoards = useBoards();
    const setStateOfBoards = useSetBoards();

    const deleteCard = async () =>{
        await cardDeleter(componentId, columnId, boardId)
    }

    const cardDeleter = async (componentId, columnId, boardId) =>{
        const response = await deleteCardFromDatabase(componentId);
        if(response.status === 200){
            const changedState = deleteCardFromState(componentId, columnId, boardId);
            setStateOfBoards(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }
    }

    const deleteCardFromDatabase = async (componentId) => {
        return  await fetch("card/" + componentId,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            method: "DELETE"});
    }
    const deleteCardFromState = (componentId, columnId, boardId) =>{
        const copyOfState = [...stateOfBoards]
        return copyOfState.map(board => {
            if(board.id === boardId){
                return {...board, boardColumns: board.boardColumns.map(boardColumn =>{
                        if(boardColumn.id === columnId){
                            return {...boardColumn, cards: boardColumn.cards.filter(card => {
                                    return card.id !== componentId;
                                })};
                        }
                        return boardColumn;
                    })};
            }
            return board;
        });
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteCard} ><RiDeleteBin6Fill/></Button>
    )
}
