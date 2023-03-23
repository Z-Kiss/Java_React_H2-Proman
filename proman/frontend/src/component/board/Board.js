import {Card} from "react-bootstrap";
import Column from "./Column";
import CreateComponentButton from "../buttons/CreateComponentButton";



export default function Board(props){

    const {board, createColumnProps, createCardProps, columnOrderManager, cardOrderManager} = props



    return(
    <Card  className={" w-auto m-4"}>

        <Card.Header  className={board.bgColor + " " +board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <CreateComponentButton createComponentProps={createColumnProps} parentComponentId={board.id} />
        </Card.Header>

        <Card.Body  className={"d-flex flex-row "}>

                {board.boardColumns
                    .sort((column1, column2) => (column1.columnOrder > column2.columnOrder ? 1 : -1))
                    .map((column) =>
                        <Column  key={column.id} column={column} createCardProps={createCardProps}
                                 parentComponentId={board.id} columnOrderManager={columnOrderManager}
                                 cardOrderManager={cardOrderManager}/>
                    )}


        </Card.Body>

    </Card>
    );
}