import {Card} from "react-bootstrap";
import Column from "../column/Column";
import DeleteComponentButton from "../buttons/DeleteComponentButton";
import CreateColumnButton from "../buttons/CreateColumnButton";
import BoardHeader from "./BoardHeader";
import BoardBody from "./BoardBody";





export default function Board({board}){


    return(

    <Card  className={" w-auto m-4"}>

        <BoardHeader board={board}/>
        <BoardBody board={board}/>

    </Card>
    );
}