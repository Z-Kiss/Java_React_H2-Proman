import {createContext, useContext, useEffect, useState} from "react";
import {useUser} from "./UserProvider";

const BoardContext = createContext({})

const BoardProvider = ({children}) => {

    const [boards, setBoards] = useState([]);
    const fetchBoards = async (user) => {
        const response = await fetch(`/board/get-boards-by-id/${user.userId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            console.log("Okboard")
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