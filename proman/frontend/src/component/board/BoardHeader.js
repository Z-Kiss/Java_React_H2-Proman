import {Card} from "react-bootstrap";
import DeleteComponentButton from "../buttons/DeleteComponentButton";
import CreateColumnButton from "../buttons/CreateColumnButton";

export default function BoardHeader({board}){
    return(
        <Card.Header  className={board.bgColor + " " +board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <div>
                <DeleteComponentButton componentId={board.id} componentType={"board"}/>
                <CreateColumnButton parentComponentId={board.id} />
            </div>
        </Card.Header>
    )
}