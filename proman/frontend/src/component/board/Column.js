import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "./BoardCard";
import CreateComponentButton from "../buttons/CreateComponentButton";
import {useRef} from "react";


export default function Column(props){

    const {column, createCardProps, parentComponentId, columnOrderManager} = props

    const columnRef = useRef(null);

    const handleDrag = (e) =>{
        e.dataTransfer.setData("columnId",column.id)
        e.dataTransfer.setData("columnOrder",column.columnOrder)
        e.dataTransfer.setData("parentComponentId", parentComponentId)
    }
    const itIsBeforeColumn = (e) =>{
        const columnWidth = columnRef.current.getBoundingClientRect().width;
        const halfDivWidth = columnWidth / 2;
        const mouseXPos = e.nativeEvent.offsetX;

        return (mouseXPos <= halfDivWidth);
    }

    const handleDrop = (e) =>{
        const columnId = parseInt(e.dataTransfer.getData("columnId"));
        const columnToDrop = parseInt(e.dataTransfer.getData("columnOrder"));
        const whereToDrop = column.columnOrder;
        const isItBefore = itIsBeforeColumn(e);

        if (e.dataTransfer.getData("parentComponentId") === parentComponentId.toString()){
            columnOrderManager(columnId, whereToDrop, columnToDrop, isItBefore, parentComponentId)
        }
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
    }


    return(
        <Card ref={columnRef} draggable onDragStart={handleDrag} onDrop={handleDrop} onDragOver={handleDragOver} style={{minWidth: "20%"}} >
            <Card.Header  className={column.bgColor + " bg-gradient " + column.textColor} >
                {column.title}
                <CreateComponentButton createComponentProps={createCardProps} parentComponentId={column.id} />
            </Card.Header>
            <Card.Body>

                <ListGroup>
                    {column.cards
                        .sort((card1, card2) => (card1.cardOrder > card2.cardOrder ? 1 : -1))
                        .map((card) =>

                        <BoardCard key={card.id} card={card} parentComponentId={column.id}/>
                    )}
                </ListGroup>

            </Card.Body>
        </Card>
    )
}