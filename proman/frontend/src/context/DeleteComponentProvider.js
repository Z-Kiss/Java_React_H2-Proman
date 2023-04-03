import {createContext, useContext} from "react";


const DeleteComponentContext = createContext({});
const DeleteComponentProvider = ({children, currentState, setState}) =>{

    let copyOfState = [...currentState];

    const componentDeleter = (boardId, parentComponentId, componentId, componentType) =>{
        switch (componentType){
            case "board":{
                boardDeleter(componentId)
                break
            }
            case "boardcolumn":{
                columnDeleter(componentId, parentComponentId)
                break
            }
            case "card":{
                cardDeleter(componentId, parentComponentId, boardId)
                break
            }
            default: return
        }
        console.log("haha")
        updateDatabase(componentType,componentId);
        setState(copyOfState);
    }

    const boardDeleter = (componentId) =>{
        copyOfState = copyOfState.filter(board =>{
            return board.id !== componentId
        })
    }
    const columnDeleter = (componentId, parentComponentId) =>{
        copyOfState = copyOfState.map(board =>{
            if (board.id === parentComponentId){
                return {...board, boardColumns: board.boardColumns.filter(boardColumn =>{
                    return boardColumn.id !== componentId
                    })}
            }
            return board
        })
    }

    const cardDeleter = (componentId, parentComponentId, boardId) =>{
        copyOfState = copyOfState.map(board => {
            if(board.id === boardId){
                return {...board, boardColumns: board.boardColumns.map(boardColumn =>{
                    if(boardColumn.id === parentComponentId){
                        return {...boardColumn, cards: boardColumn.cards.filter(card => {
                                return card.id !== componentId
                            })}
                    }
                    return boardColumn;
                    })}

            }
            return board
        })
    }

    const updateDatabase = (componentType, componentId) =>{
        deleteComponent(componentType, componentId);
        // TODO check if request was ok
    }

    const deleteComponent = async (componentType,componentId) => {
        await fetch('\\' + componentType,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id: componentId})
        })
    }



    return (
        <DeleteComponentContext.Provider value={{componentDeleter}}>
            {children}
        </DeleteComponentContext.Provider>)
}

export const useComponentDeleter = () => useContext(DeleteComponentContext).componentDeleter;

export default DeleteComponentProvider;