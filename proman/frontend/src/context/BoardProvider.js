import {createContext, useContext, useState} from "react";

const BoardContext = createContext({})

const BoardProvider = ({children}) => {

    const [boards, setBoards] = useState([]);
    const fetchBoards = async (user) => {
        const response = await fetch(`/board/${user.userId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            setBoards(await response.json());
        }
    }

    return (
        <BoardContext.Provider value={{boards, setBoards, fetchBoards}}>
            {children}
        </BoardContext.Provider>
    )
}

export const useBoards = () => useContext(BoardContext).boards;
export const useSetBoards = () => useContext(BoardContext).setBoards;
export const useFetchBoards = () => useContext(BoardContext).fetchBoards;
export default BoardProvider;