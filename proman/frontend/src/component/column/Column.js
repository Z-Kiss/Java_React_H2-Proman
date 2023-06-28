import {Card} from "react-bootstrap";
import ColumnHeader from "./ColumnHeader";
import ColumnBody from "./ColumnBody";


export default function Column({column, boardId}) {


    return (
        <Card style={{minWidth: "20%"}}>
            <ColumnHeader column={column} boardId={boardId}/>
            <ColumnBody column={column} boardId={boardId}/>
        </Card>
    )
}
