import {createContext, useContext, useEffect, useState} from "react";
import {border} from "@chakra-ui/react";


const CreateComponentContext = createContext({})

const CreateComponentProvider = ({children, currentState, setState}) => {


    const createNewObject = async (payload, url) => {
        await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(response => createComponent(response));

    }

    const createComponent = (props) => {
        let copyOfState = [...currentState];

        const {componentType} = props;
        switch (componentType) {
            case "board": {
                console.log("board")
                copyOfState = createBoard(props, copyOfState);
                break;
            }
            case "boardcolumn": {
                console.log("column")
                copyOfState = createBoardColumn(props, copyOfState);
                break;
            }
            case "card": {
                console.log("card")
                copyOfState = createCard(props, copyOfState);
                break;
            }
            default: {
                return
            }
        }

        setState(copyOfState);
    }


    const createBoard = (props, copyOfState) => {
        const {board} = props

        return [...copyOfState, board]
    }
    const createBoardColumn = (props, copyOfState) => {

        const {boardId, boardColumn} = props;

        return copyOfState.map(board => {
            if (board.id === boardId) {
                return {...board, boardColumns: [...board.boardColumns, boardColumn]};
            }
            return board;
        })
    }
    const createCard = (props, copyOfState) => {

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


    const createBoardProps = {
        placement: "bottom",
        buttonStyle: "primary",
        buttonTitle: "Create Board",
        url: "/board/create"
    }

    const createColumnProps = {
        placement: "right",
        buttonStyle: "outline-dark",
        buttonTitle: "Add Column",
        url: "/boardcolumn/create"
    }

    const createCardProps = {
        placement: "right",
        buttonStyle: "outline-dark btn-sm",
        buttonTitle: "+",
        url: "/card/create"
    }

    return (
        <CreateComponentContext.Provider
            value={{createNewObject, createBoardProps, createColumnProps, createCardProps}}>
            {children}
        </CreateComponentContext.Provider>
    )

}


export const useCreateBoardProps = () => useContext(CreateComponentContext).createBoardProps;
export const useCreateColumnProps = () => useContext(CreateComponentContext).createColumnProps;
export const useCreateCardProps = () => useContext(CreateComponentContext).createCardProps;
export const useCreateNewComponent = () => useContext(CreateComponentContext).createNewObject;
export default CreateComponentProvider;