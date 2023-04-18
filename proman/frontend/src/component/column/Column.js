import {Card, ListGroup} from "react-bootstrap";
import BoardCard from "../card/BoardCard";
import {useRef} from "react";
import { useComponentArranger } from "../../context/DragAndDropProvider"
import DeleteComponentButton from "../buttons/DeleteComponentButton";
import CreateCardButton from "../buttons/CreateCardButton";
import ColumnHeader from "./ColumnHeader";
import ColumnBody from "./ColumnBody";


export default function Column(props){

    const {column, parentComponentId} = props


    return(
        <Card  style={{minWidth: "20%"}} >
            <ColumnHeader column={column} parentComponentId={parentComponentId}/>
            <ColumnBody column={column} parentComponentId={parentComponentId} />
        </Card>
    )
}