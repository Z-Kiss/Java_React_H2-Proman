import {ListGroup} from "react-bootstrap";
import {useRef} from "react";

export default function BoardCard({card, parentComponentId, cardOrderManager}){

    const cardRef = useRef(null);

    const handleDrag = (e) =>{
        e.dataTransfer.setData("type","card")
        e.dataTransfer.setData("cardId",card.id)
        e.dataTransfer.setData("cardOrder",card.cardOrder)
        e.dataTransfer.setData("parentComponentId", parentComponentId)
    }

    const handleCardDrop = (e) =>{

        const cardId = parseInt(e.dataTransfer.getData("cardId"));
        const cardToDrop = parseInt(e.dataTransfer.getData("cardOrder"));
        const whereToDrop = card.cardOrder;
        const isItBefore = itIsOverCard(e);
        console.log(cardToDrop, whereToDrop)

        if (e.dataTransfer.getData("parentComponentId") === parentComponentId.toString()
            && e.dataTransfer.getData("type") === "card") {
            cardOrderManager(cardId, whereToDrop, cardToDrop, isItBefore, parentComponentId)
        }
    }

    const itIsOverCard = (e) =>{
        const halfCardHeight = cardRef.current.getBoundingClientRect().height / 2;
        const mouseYPos = e.nativeEvent.offsetY;
        return (mouseYPos <= halfCardHeight);
    }


    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    return(
        <ListGroup.Item ref={cardRef} draggable onDragStart={handleDrag} onDragOver={handleDragOver} onDrop={handleCardDrop} className={card.bgColor + " " + card.textColor} key={card.id * 100}>{card.title}</ListGroup.Item>
    )
}