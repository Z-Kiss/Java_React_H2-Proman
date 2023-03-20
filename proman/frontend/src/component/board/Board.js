import {Card, ListGroup} from "react-bootstrap";
import Column from "./Column";
import CreateComponentButton from "../buttons/CreateComponentButton";
import {useRef} from "react";



export default function Board(props){

    const {board, createColumnProps, createCardProps} = props

    const columnRef = useRef(null);

    const itIsBeforeColumn = (e) =>{
        const columnWidth = columnRef.current.getBoundingClientRect().width;
        const halfDivWidth = columnWidth / 2;
        const mouseXPos = e.nativeEvent.offsetX;

        return (mouseXPos <= halfDivWidth);
    }

    const handleDrop = (e) =>{
        console.log(itIsBeforeColumn(e))
    }

    const handleDrag = (e) =>{
        e.preventDefault();
    }

    return(
    <Card  className={" w-auto m-4"}>

        <Card.Header  className={board.bgColor + " " +board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <CreateComponentButton createComponentProps={createColumnProps} parentComponentId={board.id} />
        </Card.Header>

        <Card.Body onDrop={handleDrop} onDragOver={handleDrag} className={"d-flex flex-row "}>

                {board.boardColumns
                    .sort((column1, column2) => (column1.columnOrder > column2.columnOrder ? 1 : -1))
                    .map((column) =>
                        <Column  key={column.id} column={column} columnRef={columnRef} createCardProps={createCardProps} />
                    )}


        </Card.Body>

    </Card>
    );
}