import Button from "react-bootstrap/Button";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function DeleteBoardButton({columnId, boardId}){

    const stateOfBoards = useBoards();
    const setStateOfBoards = useSetBoards();

    const deleteColumn = async () =>{
        await columnDeleter(columnId, boardId)
    }
    const columnDeleter = async (columnId, boardId) =>{
        const response = await deleteColumnFromDatabase(columnId);
        if(response.status === 200){
            const changedState = deleteColumnFromState(columnId,boardId);
            setStateOfBoards(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }

    }
    const deleteColumnFromDatabase = async (columnId) => {
        return await fetch("board-column/" + columnId,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            method: "DELETE"});
    }
    const deleteColumnFromState = (columnId, boardId) =>{
        const copyOfState = [...stateOfBoards];
        return copyOfState.map(board =>{
            if (board.id === boardId){
                return {...board, boardColumns: board.boardColumns.filter(boardColumn =>{
                        return boardColumn.id !== columnId;
                    })}
            }
            return board;
        });
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteColumn} ><RiDeleteBin6Fill/></Button>
    )
}
