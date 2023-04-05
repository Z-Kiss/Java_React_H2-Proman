import {Card} from "react-bootstrap";
import Column from "./Column";
import CreateComponentButton from "../buttons/CreateComponentButton";
import DeleteComponentButton from "../buttons/DeleteComponentButton";
import {useCreateColumnProps} from "../../context/CreateComponentProvider";




export default function Board(props){

    const {board} = props;

    const createColumnProps = useCreateColumnProps();



    return(
    <Card  className={" w-auto m-4"}>

        <Card.Header  className={board.bgColor + " " +board.textColor +" bg-gradient w-auto d-flex flex-row justify-content-between align-items-center align-content-center "}>
            <p><b>{board.title}</b></p>
            <div>
                <DeleteComponentButton componentId={board.id} componentType={"board"}/>
                <CreateComponentButton createComponentProps={createColumnProps} parentComponentId={board.id} />
            </div>
        </Card.Header>

        <Card.Body  className={"d-flex flex-row "}>

                {board.boardColumns
                    .sort((column1, column2) => (column1.columnOrder > column2.columnOrder ? 1 : -1))
                    .map((column) =>
                        <Column  key={column.id} column={{...column}}  parentComponentId={board.id}/>
                    )}



        </Card.Body>

    </Card>
    );
}