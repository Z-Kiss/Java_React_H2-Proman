import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "./BoardCard";
import CreateComponentButton from "../buttons/CreateComponentButton";


export default function Column(props){

    const {column, columnRef, createCardProps} = props
    const handleDrag = (e) =>{
        console.log(column.id)

        console.log(e.currentTarget)
    }

    return(
        <Card ref={columnRef} draggable onDragStart={handleDrag} style={{minWidth: "20%"}} >
            <Card.Header  className={column.bgColor + " bg-gradient " + column.textColor} >
                {column.title}
                <CreateComponentButton createComponentProps={createCardProps} parentComponentId={column.id} />
            </Card.Header>
            <Card.Body>

                <ListGroup>
                    {column.cards
                        .sort((card1, card2) => (card1.cardOrder > card2.cardOrder ? 1 : -1))
                        .map((card) =>

                        <BoardCard key={card.id} card={card} />
                    )}
                </ListGroup>

            </Card.Body>
        </Card>
    )
}