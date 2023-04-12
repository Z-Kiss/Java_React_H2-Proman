import {createContext, useContext} from "react";



const CreateComponentContext = createContext({})

const CreateComponentProvider = ({children, copyOfState, setState}) => {

    const createNewBoard = async (payload) => {

        const newBoard = await createBoardInDatabase(payload);

        if (newBoard) {
            const updatedState = updateStateWithNewBoard(newBoard);
            setState(updatedState);
        } else {
            console.log("nope")
        }

    }
    const createBoardInDatabase = async (payload) => {
        const response = await fetch("/board/create", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        if(response.status === 200){
           return await response.json();

        }else {
            console.log("nope")
            return undefined
        }
    }
    const updateStateWithNewBoard = (props) => {
        const {board} = props
        return [...copyOfState, board]
    }

    const createNewColumn = async (payload) => {
        const newColumn = await createColumnInDatabase(payload);

        if (newColumn) {
            const updatedState = updateStateWithNewColumn(newColumn);
            setState(updatedState);
        } else {
            console.log("nope")
        }
    }
    const createColumnInDatabase = async (payload) => {

        let response = await fetch("/board-column/create", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        if(response.status === 200){
            return  await response.json();
        }else {
            console.log("nope")
            return undefined
        }

    }
    const updateStateWithNewColumn = (props) => {
        //boardId is the id of the Board that contains the boardColumn

        const {boardId, boardColumn} = props;

        return copyOfState.map(board => {
            if (board.id === boardId) {
                return {...board, boardColumns: [...board.boardColumns, boardColumn]};
            }
            return board;
        })
    }

    const createNewCard = async (payload) => {
        const newCard = await createCardInDatabase(payload);
        if (newCard) {
            const updatedState = updateStateWithNewCard(newCard);
            setState(updatedState);
        } else {
            console.log("nope")
        }
    }
    const createCardInDatabase = async (payload) => {
        let response = await fetch("/card/create", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        if(response.status === 200){
            return await response.json();
        }else {
            console.log("nope")
        }
    }
    const updateStateWithNewCard = (props) => {
        //boardColumnId is the id of the BoardColumn that contains the Card

        const {boardColumnId, card} = props;

        return copyOfState.map(board => {
            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === boardColumnId) {

                        return {...boardColumn, cards: [...boardColumn.cards,card]}
                    }
                    return boardColumn
                })


            }
        })
    }


    const create = {
        newCard: createNewCard,
        newColumn: createNewColumn,
        newBoard: createNewBoard
    }




    return (
        <CreateComponentContext.Provider value={{create}}>
            {children}
        </CreateComponentContext.Provider>
    )

}

export const useCreate = () => useContext(CreateComponentContext).create;

export default CreateComponentProvider;