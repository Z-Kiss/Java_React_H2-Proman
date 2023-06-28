import Board from "../board/Board";
import {useBoards, useFetchBoards} from "../../context/BoardProvider";
import {useEffect} from "react";
import {useUser} from "../../context/UserProvider";

export default function Table() {
    const boards = useBoards();
    const fetchBoards = useFetchBoards();
    const user = useUser();

    useEffect(() => {
        if (user.userId !== null) {
            fetchBoards(user);
        }
    }, [user]);

    return (boards &&
        <div id={"board-container"} className={"d-flex flex-column mx-auto w-75"}>
            {boards
                .map((board) =>
                    <Board key={board.id} board={{...board}}/>
                )}
        </div>
    );
}
