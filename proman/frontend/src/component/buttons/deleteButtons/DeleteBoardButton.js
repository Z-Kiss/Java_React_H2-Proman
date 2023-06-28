import {RiDeleteBin6Fill} from "react-icons/ri";
import Button from "react-bootstrap/Button";

import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function DeleteBoardButton({boardId}){
    const boardState = useBoards()
    const setBoardState = useSetBoards();
    const deleteBoard = async () =>{
        await boardDeleter(boardId)
    }
    const boardDeleter = async (boardId) =>{

        const response = await deleteBoardFromDatabase(boardId);
        if(response.status === 200){
            const changedState = deleteBoardFormState(boardId);
            setBoardState(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }
    }
    const deleteBoardFromDatabase = async (boardId) => {
        return await fetch("board/" + boardId,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            method: "DELETE"});
    }
    const deleteBoardFormState = (boardId) =>{
        const copyOfState = [...boardState]
        return copyOfState.filter(board =>{
            return board.id !== boardId;
        })
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteBoard} ><RiDeleteBin6Fill/></Button>
    )
}
