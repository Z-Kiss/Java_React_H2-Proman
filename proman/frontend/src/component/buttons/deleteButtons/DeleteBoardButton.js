import {RiDeleteBin6Fill} from "react-icons/ri";
import Button from "react-bootstrap/Button";

import {useBoards, useSetBoards} from "../../../context/BoardProvider";

export default function DeleteBoardButton({componentId}){

    const boardState = useBoards()
    const setBoardState = useSetBoards();
    const deleteBoard = async () =>{
        await boardDeleter(componentId)
    }
    const boardDeleter = async (componentId) =>{

        const response = await deleteBoardFromDatabase(componentId);
        if(response.status === 200){
            const changedState = deleteBoardFormState(componentId, boardState);
            setBoardState(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }
    }
    const deleteBoardFromDatabase = async (componentId) => {
        return await fetch("board/" + componentId,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            method: "DELETE"});
    }
    const deleteBoardFormState = (componentId, boardState) =>{
        const copyOfState = [...boardState]
        return copyOfState.filter(board =>{
            return board.id !== componentId;
        })
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteBoard} ><RiDeleteBin6Fill/></Button>
    )
}
