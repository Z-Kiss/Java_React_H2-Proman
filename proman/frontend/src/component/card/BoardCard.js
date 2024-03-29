import {ListGroup} from "react-bootstrap";
import { useComponentArranger } from "../../context/DragAndDropProvider";
import DeleteCardButton from "../buttons/deleteButtons/DeleteCardButton";

export default function BoardCard({card, columnId, boardId, bgColor, textColor}){

    const componentArranger = useComponentArranger();

    const calculateWhereToPlace = (e) =>{
        let indexWhereToPlace = card.cardOrder;
        const indexOfDraggedComponent = parseInt(e.dataTransfer.getData("cardOrder"));
        const isItBefore = itIsOverCard(e);

        if (indexWhereToPlace > indexOfDraggedComponent && parseInt(e.dataTransfer.getData("parentComponentId")) === columnId) {
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
                idOfDropZoneParentComponent: columnId,
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
        e.dataTransfer.setData("parentComponentId", columnId)
        e.dataTransfer.setData("boardId", boardId)
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
                        className={ bgColor + " " + textColor + " w-auto d-flex flex-row justify-content-between align-items-center align-content-center" } key={card.id * 100}>
            {card.title}
            <DeleteCardButton componentId={card.id} columnId={columnId} boardId={boardId} />
        </ListGroup.Item>
    )
}
