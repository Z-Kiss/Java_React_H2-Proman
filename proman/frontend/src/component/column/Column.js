import {Card} from "react-bootstrap";
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