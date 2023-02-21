import Table from 'react-bootstrap/Table';
import {Card, ListGroup} from "react-bootstrap";
import {CardBody} from "@chakra-ui/react";

export default function Boards({boards}) {
    return(boards &&
            <div className={"d-flex flex-column mx-auto w-75"} >
                {boards.map((board) =>
                <Card className={"w-auto m-4"} key={board.id}>

                    <Card.Header className={"w-auto"}>{board.boardName}</Card.Header>

                    <Card.Body className={"d-flex flex-row mx-auto"}>
                        {board.boardColumns.map((column) =>
                            <Card key={column.id}>
                                <Card.Header>{column.columnTitle}</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                    {column.cards.map((card) =>
                                        <ListGroup.Item key={card.id}>{card.cardTitle}</ListGroup.Item>
                                    )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        )}
                    </Card.Body>
                </Card>
                )}
            </div>

    )




    // return (boards &&
    //     <div className={"d-flex flex-column w-75 mx-auto"}>
    //         {boards.map((board) =>
    //             <Table className={"m-3"}  key={board.id} hover={true} bordered={true} variant={"dark"}>
    //                 <thead>
    //                 <tr>
    //                     <th>{board.boardName}</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody>
    //                 <tr>
    //                 {board.boardColumns.map((column) =>
    //                     <>
    //                         <th key={column.id} >{column.columnTitle}</th>
    //                         <>
    //                             {column.cards.map((card) =>
    //
    //                                 <th key={card.id}>{card.title}</th>
    //                             )}
    //                         </>
    //
    //                     </>
    //                 )}
    //                 </tr>
    //                 </tbody>
    //
    //
    //             </Table>)}
    //     </div>
    //
    // )
}