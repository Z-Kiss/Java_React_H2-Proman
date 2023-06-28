import {Card} from "react-bootstrap";
import CreateColumnButton from "../buttons/createButtons/CreateColumnButton";
import DeleteBoardButton from "../buttons/deleteButtons/DeleteBoardButton";

export default function BoardHeader({board}){
    return(
        <Card.Header  className={board.bgColor + " " + board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <div>
                <DeleteBoardButton boardId={board.id}/>
                <CreateColumnButton boardId={board.id} />
            </div>
        </Card.Header>
    )
}
