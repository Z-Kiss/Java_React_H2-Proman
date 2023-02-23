import {Card, ListGroup} from "react-bootstrap";
import Column from "./Column";
import Button from "react-bootstrap/Button";

export default function Board({board}){

    return(
    <Card  className={" w-auto m-4"}>

        <Card.Header  className={board.bgColor + " " +board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <Button variant="outline-dark">Add Column</Button>
        </Card.Header>

        <Card.Body className={"d-flex flex-row "}>
            {board.boardColumns.map((column) =>
                <Column key={column.id} column={column}/>
            )}
        </Card.Body>
    </Card>
    );
}