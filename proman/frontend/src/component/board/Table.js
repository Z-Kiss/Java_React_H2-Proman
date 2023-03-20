
import Board from "./Board";



export default function  Boards({boards, createColumnProps, createCardProps}) {



    return(boards &&
            <div id={"board-container"} className={"d-flex flex-column mx-auto w-75"} >

                {boards
                    .sort((board1, board2) => (board1.id > board2.id? 1 : -1))
                    .map((board) =>
                <Board key={board.id} board={board} createColumnProps={createColumnProps} createCardProps={createCardProps}/>
                )}

            </div>

    )

}