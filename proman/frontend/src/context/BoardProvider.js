import {createContext, useContext} from "react";

const BoardContext = createContext({})

const BoardProvider = ({children}) =>{

    const getGuestBoards = async () => {
        const response = await fetch("/board/get-all-guest-boards")
        if (response.status === 200) {
            return await response.json();
        }
    }

    const getUserBoard = async () => {
        const response = await fetch("/board/get-all-boards-by-user")
        if (response.status === 200) {
            return  await response.json();
        }
    }

    const getBoards ={
        ofUser:getUserBoard,
        ofGuest:getGuestBoards
    }

    return(
        <BoardContext.Provider value={{getBoards}}>
            {children}
        </BoardContext.Provider>
    )
}

export const useGetBoards = () => useContext(BoardContext).getBoards;
export default BoardProvider;