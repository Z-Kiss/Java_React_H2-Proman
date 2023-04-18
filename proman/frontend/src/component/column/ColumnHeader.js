import {Card} from "react-bootstrap";
import DeleteComponentButton from "../buttons/DeleteComponentButton";
import CreateCardButton from "../buttons/CreateCardButton";
import {useComponentArranger} from "../../context/DragAndDropProvider";

export default function ColumnHeader({column, parentComponentId}){

    const componentArranger = useComponentArranger();


    const calculateWhereToPlace = (e) =>{
        let indexWhereToPlace = column.columnOrder;

        const indexOfDraggedComponent = parseInt(e.dataTransfer.getData("columnOrder"));
        const isItBefore = itIsBeforeColumn(e)

        if (indexWhereToPlace > indexOfDraggedComponent) {
            indexWhereToPlace -= 1
        }

        return isItBefore ? indexWhereToPlace : indexWhereToPlace + 1
    }

    const itIsBeforeColumn = (e) =>{
        const columnWidth = e.target.getBoundingClientRect().width;
        const halfDivWidth = columnWidth / 2;
        const mouseXPos = e.nativeEvent.offsetX;
        return (mouseXPos <= halfDivWidth);
    }

    const propGenerator = (e) => {
        return {
            DropZoneComponentProps: {
                idOfDropZoneComponent: column.id,
                idOfDropZoneParentComponent: parentComponentId,
                indexWhereToPlace: calculateWhereToPlace(e)
            },
            DraggedComponentProps: {
                idOfDraggedComponent: parseInt(e.dataTransfer.getData("columnId")),
                idOfDraggedParentComponent: parseInt(e.dataTransfer.getData("parentComponentId")),
                indexOfDraggedComponent: parseInt(e.dataTransfer.getData("columnOrder"))
            },
            componentType:e.dataTransfer.getData("type"),
            boardId: parentComponentId
        };

    }

    const handleDrop = (e) =>{
        console.log("happenf")
        if(e.dataTransfer.getData("type") === "column" && column.id !== parseInt(e.dataTransfer.getData("columnId"))) {
            componentArranger(propGenerator(e));
        }
    }
    const handleDrag = (e) =>{
        e.dataTransfer.setData("type","column");
        e.dataTransfer.setData("columnId",column.id);
        e.dataTransfer.setData("columnOrder",column.columnOrder);
        e.dataTransfer.setData("parentComponentId", parentComponentId);

    }

    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    return(
        <Card.Header draggable onDragStart={handleDrag} onDrop={handleDrop} onDragOver={handleDragOver}
                     className={column.bgColor + " bg-gradient " + column.textColor + " w-auto d-flex flex-row justify-content-between align-items-center align-content-center"} >
            <p>{column.title}</p>
            <div>
                <DeleteComponentButton parentComponentId={parentComponentId} componentId={column.id} componentType={"boardcolumn"} />
                <CreateCardButton parentComponentId={column.id} />
            </div>

        </Card.Header>
    )
}