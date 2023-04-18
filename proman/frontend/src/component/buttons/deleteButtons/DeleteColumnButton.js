import {useDeleter} from "../../../context/DeleteComponentProvider";
import Button from "react-bootstrap/Button";
import {RiDeleteBin6Fill} from "react-icons/ri";

export default function DeleteBoardButton({componentId, parentComponentId}){

    const deleter = useDeleter();

    const deleteBoard = () =>{
        deleter.ofColumn(componentId, parentComponentId)
    }

    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteBoard} ><RiDeleteBin6Fill/></Button>
    )
}