import {ListGroup} from "react-bootstrap";

export default function BoardCard({card}){
    return(
        <ListGroup.Item key={card.id * 100}>{card.cardTitle}</ListGroup.Item>
    )
}