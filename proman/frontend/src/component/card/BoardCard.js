import {ListGroup} from "react-bootstrap";
import {useRef} from "react";
import { useComponentArranger } from "../../context/DragAndDropProvider";
import DeleteComponentButton from "../buttons/DeleteComponentButton";

export default function BoardCard({card, parentComponentId, boardId}){


    const componentArranger = useComponentArranger();

    const calculateWhereToPlace = (e) =>{
        let indexWhereToPlace = card.cardOrder;

        const indexOfDraggedComponent = parseInt(e.dataTransfer.getData("cardOrder"));
        const isItBefore = itIsOverCard(e);

        if (indexWhereToPlace > indexOfDraggedComponent && parseInt(e.dataTransfer.getData("parentComponentId")) === parentComponentId) {
            indexWhereToPlace -= 1
        }
        return isItBefore ? indexWhereToPlace : indexWhereToPlace + 1
    }

    const itIsOverCard = (e) =>{
        const cardHeight = e.target.getBoundingClientRect().height;
        const halfCardHeight = cardHeight / 2;
        const mouseYPos = e.nativeEvent.offsetY;
        return (mouseYPos <= halfCardHeight);
    }

    const propGenerator = (e) => {
        return {
            DropZoneComponentProps: {
                idOfDropZoneComponent: card.id,
                idOfDropZoneParentComponent: parentComponentId,
                indexWhereToPlace: calculateWhereToPlace(e)
            },
            DraggedComponentProps: {
                idOfDraggedComponent: parseInt(e.dataTransfer.getData("cardId")),
                idOfDraggedParentComponent: parseInt(e.dataTransfer.getData("parentComponentId")),
                indexOfDraggedComponent: parseInt(e.dataTransfer.getData("cardOrder"))
            },
            componentType:e.dataTransfer.getData("type"),
            boardId: boardId
        };

    }

    const handleDrag = (e) =>{
        e.dataTransfer.setData("type","card")
        e.dataTransfer.setData("cardId",card.id)
        e.dataTransfer.setData("cardOrder",card.cardOrder)
        e.dataTransfer.setData("parentComponentId", parentComponentId)
    }

    const handleDrop = (e) =>{

        if(e.dataTransfer.getData("type") === "card" && card.id !== parseInt(e.dataTransfer.getData("cardId"))){
            componentArranger(propGenerator(e));
        }

    }


    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    return(
        <ListGroup.Item draggable onDragStart={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop}
                        className={ card.bgColor + " " + card.textColor + " w-auto d-flex flex-row justify-content-between align-items-center align-content-center" } key={card.id * 100}>
            {card.title}
            <DeleteComponentButton boardId={boardId} parentComponentId={parentComponentId} componentId={card.id} componentType={"card"}/>
        </ListGroup.Item>
    )
}

