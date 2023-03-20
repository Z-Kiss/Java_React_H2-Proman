import {ListGroup} from "react-bootstrap";

export default function BoardCard({card}){
    return(
        <ListGroup.Item className={card.bgColor + " " + card.textColor} key={card.id * 100}>{card.title}</ListGroup.Item>
    )
}