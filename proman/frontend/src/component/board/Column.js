import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "./BoardCard";
import CreateComponentButton from "../buttons/CreateComponentButton";
import {useRef} from "react";
import { useComponentArranger } from "../../context/DragAndDropProvider"


export default function Column(props){

    const {column, createCardProps, parentComponentId} = props
    const componentArranger = useComponentArranger();

    const columnRef = useRef(null);

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
        const columnWidth = columnRef.current.getBoundingClientRect().width;
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
            componentType:e.dataTransfer.getData("type")
        };

    }
    const handleDrag = (e) =>{
        e.dataTransfer.setData("type","column");
        e.dataTransfer.setData("columnId",column.id);
        e.dataTransfer.setData("columnOrder",column.columnOrder);
        e.dataTransfer.setData("parentComponentId", parentComponentId);
    }

    const handleDrop = (e) =>{
        if(e.dataTransfer.getData("type") === "column" && column.id !== parseInt(e.dataTransfer.getData("columnId"))) {
            componentArranger(propGenerator(e));
        }
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
    }


    return(
        <Card  style={{minWidth: "20%"}} >
            <Card.Header ref={columnRef} draggable onDragStart={handleDrag} onDrop={handleDrop} onDragOver={handleDragOver}  className={column.bgColor + " bg-gradient " + column.textColor} >
                {column.title}
                <CreateComponentButton createComponentProps={createCardProps} parentComponentId={column.id} />
            </Card.Header>
            <Card.Body onDragOver={handleDragOver} >

                <ListGroup>
                    {column.cards
                        .sort((card1, card2) => (card1.cardOrder > card2.cardOrder ? 1 : -1))
                        .filter(Boolean)
                        .map((card) =>

                        <BoardCard key={card.id} card={{...card}} parentComponentId={column.id} />
                    )}
                </ListGroup>

            </Card.Body>
        </Card>
    )
}