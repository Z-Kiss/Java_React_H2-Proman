import {RiDeleteBin6Fill} from "react-icons/ri";
import Button from "react-bootstrap/Button";
import {useDeleter} from "../../../context/DeleteComponentProvider";

export default function DeleteBoardButton({componentId}){

    const deleter = useDeleter();

    const deleteBoard = () =>{
        deleter.ofBoard(componentId)
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteBoard} ><RiDeleteBin6Fill/></Button>
    )
}