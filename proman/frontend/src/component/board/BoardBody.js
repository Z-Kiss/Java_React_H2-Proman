import {Card} from "react-bootstrap";
import Column from "../column/Column";

export default function BoardBody({board}){
    return(
        <Card.Body  className={"d-flex flex-row "}>
            {board.boardColumns
                .filter(Boolean)
                .map((column) =>
                    <Column  key={column.id} column={{...column}}  boardId={board.id}/>
                )}
        </Card.Body>
    )
}
