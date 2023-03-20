import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "./BoardCard";
import CreateComponentButton from "../buttons/CreateComponentButton";
import {useDrag} from "react-dnd";

export default function Column(props){

    const {column, createCardProps} = props
    const [{isDragging}, drag] = useDrag(() =>({
        type: "column",
        item: column,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));


    return(
        <Card ref={drag} style={{minWidth: "20%"}}>
            <Card.Header className={column.bgColor + " bg-gradient " + column.textColor} >
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