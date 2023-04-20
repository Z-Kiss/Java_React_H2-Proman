import {createContext, useContext} from "react";


const DeleteComponentContext = createContext({});
const DeleteComponentProvider = ({children, currentState, setState}) =>{

    let copyOfState = [...currentState];

    //Board deleter

    const boardDeleter = async (componentId) =>{
        const response = await deleteBoardFromDatabase(componentId);
        if(response.status === 200){
            const changedState = deleteBoardFormState(componentId);
            setState(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }

    }
    const deleteBoardFormState = (componentId) =>{
        return copyOfState = copyOfState.filter(board =>{
            return board.id !== componentId;
        })
    }
    const deleteBoardFromDatabase = async (componentId) => {
        return await fetch("board/" + componentId,{
            method: "DELETE"});
    }

    // Column Deleter

    const columnDeleter = async (componentId, parentComponentId) =>{
        const response = await deleteColumnFromDatabase(componentId);
        if(response.status === 200){
            const changedState = deleteColumnFromState(componentId,parentComponentId);
            setState(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }

    }
    const deleteColumnFromDatabase = async (componentId) => {
        return await fetch("board-column/" + componentId,{
            method: "DELETE"});
    }
    const deleteColumnFromState = (componentId, parentComponentId) =>{
        return copyOfState.map(board =>{
            if (board.id === parentComponentId){
                return {...board, boardColumns: board.boardColumns.filter(boardColumn =>{
                    return boardColumn.id !== componentId;
                    })}
            }
            return board;
        });
    }

    //Card Deleter

    const cardDeleter = async (componentId, parentComponentId, boardId) =>{
        const response = await deleteCardFromDatabase(componentId);
        if(response.status === 200){
            const changedState = deleteCardFromState(componentId, parentComponentId, boardId);
            setState(changedState);
        }else{
            alert("Some problem occurred with the Server try again");
        }
    }

    const deleteCardFromDatabase = async (componentId) => {
        return  await fetch("card/" + componentId,{
            method: "DELETE"});
    }
    const deleteCardFromState = (componentId, parentComponentId, boardId) =>{
        return copyOfState = copyOfState.map(board => {
            if(board.id === boardId){
                return {...board, boardColumns: board.boardColumns.map(boardColumn =>{
                    if(boardColumn.id === parentComponentId){
                        return {...boardColumn, cards: boardColumn.cards.filter(card => {
                                return card.id !== componentId;
                            })};
                    }
                    return boardColumn;
                    })};
            }
            return board;
        });
    }

    const deleter = {
        ofBoard: boardDeleter,
        ofColumn: columnDeleter,
        ofCard: cardDeleter
    };

    return (
        <DeleteComponentContext.Provider value={{deleter}}>
            {children}
        </DeleteComponentContext.Provider>
    );
}

export const useDeleter = () => useContext(DeleteComponentContext).deleter;

export default DeleteComponentProvider;