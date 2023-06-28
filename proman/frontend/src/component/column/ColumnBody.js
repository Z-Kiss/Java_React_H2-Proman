import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "../card/BoardCard";
import {useComponentArranger} from "../../context/DragAndDropProvider";

export default function ColumnBody({column, boardId}){

    const componentArranger = useComponentArranger();
    const propGenerator = (e) => {
        return {
            DropZoneComponentProps: {
                idOfDropZoneParentComponent: column.id,
                indexWhereToPlace: 0
            },
            DraggedComponentProps: {
                idOfDraggedComponent: parseInt(e.dataTransfer.getData("cardId")),
                idOfDraggedParentComponent: parseInt(e.dataTransfer.getData("parentComponentId")),
                indexOfDraggedComponent: parseInt(e.dataTransfer.getData("cardOrder"))
            },
            componentType:e.dataTransfer.getData("type"),
            boardId:boardId
        };
    }

    const handleDrop = (e) => {
        if(e.dataTransfer.getData("type") === "card" && column.cards.length === 0){
            componentArranger(propGenerator(e))
        }
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    return(
        <Card.Body style={{minHeight: "60px"}} onDragOver={handleDragOver} onDrop={handleDrop} >
            <ListGroup>
                {column.cards
                    .sort((card1, card2) => (card1.cardOrder > card2.cardOrder ? 1 : -1))
                    // sometimes it happens that undefined element created in the BoardColumns
                    // this .filter(Boolean) get rid of it
                    // in the future I will fix the problem but at the moment it's just a temporary fix
                    .filter(Boolean)
                    .map((card) =>
                        <BoardCard key={card.id} card={{...card}} columnId={column.id} boardId={boardId} bgColor={column.bgColor} textColor={column.textColor} />
                    )}
            </ListGroup>
        </Card.Body>
    )
}