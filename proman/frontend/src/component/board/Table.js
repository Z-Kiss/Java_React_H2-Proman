import Table from 'react-bootstrap/Table';

export default function Boards({boards}) {

    return (boards && <>{
            boards.map((board) =>
                <Table bordered hover variant={"dark"}>
                    <thead>
                    <tr>
                        {board.boardName}
                    </tr>
                    </thead>
                </Table>
            )
        }</>

    )
}