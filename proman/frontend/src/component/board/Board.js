import {Card, ListGroup} from "react-bootstrap";
import Column from "./Column";
import CreateComponentButton from "../buttons/CreateComponentButton";
import {DndProvider, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function Board(props){

    const {board, createColumnProps, createCardProps} = props

    const [{isOver}, drop] = useDrop(() => ({
        accept:"column",
        drop: (item,event) => handleDrop(item, event),
        collect: (monitor) => ({
        isOver:!!monitor.isOver()})
    }));

    const handleDrop = (item,event) => {
        console.log(item)
        console.log(event)

    }

    return(
    <Card  className={" w-auto m-4"}>

        <Card.Header  className={board.bgColor + " " +board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <CreateComponentButton createComponentProps={createColumnProps} parentComponentId={board.id} />
        </Card.Header>

        <Card.Body ref={drop} className={"d-flex flex-row "}>

                {board.boardColumns
                    .sort((column1, column2) => (column1.columnOrder > column2.columnOrder ? 1 : -1))
                    .map((column) =>
                        <Column key={column.id} column={column} createCardProps={createCardProps} />
                    )}


        </Card.Body>

    </Card>
    );
}