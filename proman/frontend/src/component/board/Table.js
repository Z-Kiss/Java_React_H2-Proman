
import Board from "./Board";




export default function  Boards({boards}) {


    return(boards &&
            <div id={"board-container"} className={"d-flex flex-column mx-auto w-75"} >

                {boards
                    .map((board) =>
                <Board key={board.id} board={{...board}} />
                )}
            </div>

    )

}