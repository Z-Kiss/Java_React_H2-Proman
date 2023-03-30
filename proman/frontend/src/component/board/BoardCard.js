import {ListGroup} from "react-bootstrap";
import {useRef} from "react";
import { useComponentArranger } from "../../context/DragAndDropProvider";

export default function BoardCard({card, parentComponentId}){

    const cardRef = useRef(null);

    const componentArranger = useComponentArranger();

    const calculateWhereToPlace = (e) =>{
        let indexWhereToPlace = card.cardOrder;

        const indexOfDraggedComponent = parseInt(e.dataTransfer.getData("cardOrder"));
        const isItBefore = itIsOverCard(e);

        if (indexWhereToPlace > indexOfDraggedComponent) {
            indexWhereToPlace -= 1
        }
        return isItBefore ? indexWhereToPlace : indexWhereToPlace + 1
    }

    const itIsOverCard = (e) =>{
        const halfCardHeight = cardRef.current.getBoundingClientRect().height / 2;
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
            componentType:e.dataTransfer.getData("type")
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
        <ListGroup.Item gp={3} ref={cardRef} draggable onDragStart={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop}
                        className={ card.bgColor + " " + card.textColor } key={card.id * 100}>{ card.title}</ListGroup.Item>
    )
}

// variant={card.bgColor.slice(3)} className={ "dark" } for Lighter card Color