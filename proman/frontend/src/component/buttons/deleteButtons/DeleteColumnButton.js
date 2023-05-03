import Button from "react-bootstrap/Button";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function DeleteBoardButton({componentId, parentComponentId}){

    const stateOfBoards = useBoards();
    const setStateOfBoards = useSetBoards();

    const deleteColumn = async () =>{
        await columnDeleter(componentId, parentComponentId)
    }
    const columnDeleter = async (componentId, parentComponentId) =>{
        const response = await deleteColumnFromDatabase(componentId);
        if(response.status === 200){
            const changedState = deleteColumnFromState(componentId,parentComponentId);
            setStateOfBoards(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }

    }
    const deleteColumnFromDatabase = async (componentId) => {
        return await fetch("board-column/" + componentId,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            method: "DELETE"});
    }
    const deleteColumnFromState = (componentId, parentComponentId) =>{
        const copyOfState = [...stateOfBoards];
        return copyOfState.map(board =>{
            if (board.id === parentComponentId){
                return {...board, boardColumns: board.boardColumns.filter(boardColumn =>{
                        return boardColumn.id !== componentId;
                    })}
            }
            return board;
        });
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteColumn} ><RiDeleteBin6Fill/></Button>
    )
}
