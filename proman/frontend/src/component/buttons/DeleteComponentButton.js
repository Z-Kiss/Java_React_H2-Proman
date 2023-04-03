import {RiDeleteBin6Fill} from "react-icons/ri";
import Button from "react-bootstrap/Button";
import {useComponentDeleter} from "../../context/DeleteComponentProvider";

const DeleteComponentButton = ({boardId, parentComponentId, componentId, componentType}) => {

    const componentDeleter = useComponentDeleter();

    const deleteComponent = () => {
        componentDeleter(boardId, parentComponentId, componentId, componentType)
    }


    return(
        <Button className={"btn-sm"} variant={"outline-dark"} onClick={deleteComponent} ><RiDeleteBin6Fill/></Button>
    )
}

export default DeleteComponentButton;