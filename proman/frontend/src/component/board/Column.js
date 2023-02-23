import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "./BoardCard";

export default function Column({column}){
    return(
        <Card>
            <Card.Header className={column.bgColor + " bg-gradient " + column.textColor} >{column.title} </Card.Header>
            <Card.Body>
                <ListGroup>
                    {column.cards.map((card) =>
                        <BoardCard key={card.id} card={card} />
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}