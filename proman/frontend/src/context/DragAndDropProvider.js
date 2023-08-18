import {createContext, useContext} from "react";
import {useBoards, useSetBoards} from "./BoardProvider";

const DragAndDropContext = createContext({});

const DragAndDropProvider = ({children}) => {

    const currentState = useBoards();
    const setState = useSetBoards();

    const isItCard = (componentType) => {
        return componentType === "card";
    }

    const isItColumn = (componentType) => {
        return componentType === "column";
    }

    const IsItNeedToChangeParentComponent = (idOfDraggedParentComponent, idOfDropZoneParentComponent) => {
        return idOfDropZoneParentComponent !== idOfDraggedParentComponent;
    }

    const componentArranger = async (changeProps) => {

        const {DraggedComponentProps, DropZoneComponentProps, componentType, boardId} = changeProps;
        const {idOfDraggedParentComponent, indexOfDraggedComponent} = DraggedComponentProps;
        const {idOfDropZoneParentComponent, indexWhereToPlace} = DropZoneComponentProps;
        let copyOfState = [...currentState];

        if (IsItNeedToChangeParentComponent(idOfDraggedParentComponent, idOfDropZoneParentComponent)) {
            copyOfState = changeParentsOfComponent(copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent, idOfDropZoneParentComponent, indexWhereToPlace);
            await cardUpdaterForCardsWithChangedParents(copyOfState, idOfDropZoneParentComponent, boardId);
        } else {
            if (isItCard(componentType)) {
                copyOfState = arrangeCards(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent);
                await cardUpdater(copyOfState, idOfDropZoneParentComponent, boardId);
            } else if (isItColumn(componentType)) {
                copyOfState = arrangeColumns(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent);
                boardColumnUpdater(copyOfState, idOfDropZoneParentComponent);
            }
        }
        setState(copyOfState);
    }

    //*********Array manipulator methods***********

    //*********Card changer functions
    const changeParentsOfComponent = (copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent, idOfDropZoneParentComponent, indexWhereToPlace) => {
        const props = takeChildrenFromParent(copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent);
        copyOfState = props.copyOfState;
        const childrenToChangeParent = props.takenChildren;
        return giveChildrenToParent(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, childrenToChangeParent);
    }
    const takeChildrenFromParent = (copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent) => {
        let takenChildren;
        copyOfState = copyOfState.map(board => {
            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === idOfDraggedParentComponent) {
                        takenChildren = boardColumn.cards.splice(indexOfDraggedComponent, 1);
                        return {
                            ...boardColumn,
                            cards: adjustComponentOrderAttribute([...boardColumn.cards], "cardOrder")
                        };
                    }
                    return boardColumn;
                })
            };
        })

        return {takenChildren: takenChildren[0], copyOfState: copyOfState};
    }
    const giveChildrenToParent = (currentState, idOfDropZoneParentComponent, indexWhereToPlace, childComponent) => {
        return currentState.map(board => {
            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === idOfDropZoneParentComponent) {
                        boardColumn.cards.splice(indexWhereToPlace, 0, childComponent);
                        return {...boardColumn, cards: adjustComponentOrderAttribute(boardColumn.cards, "cardOrder")};
                    }
                    return boardColumn;
                })
            };
        });
    }
    const arrangeCards = (copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent) => {
        return copyOfState.map(board => {
            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                        if (boardColumn.id === idOfDropZoneParentComponent) {
                            return {
                                ...boardColumn,
                                cards: arrangeArray(indexWhereToPlace, indexOfDraggedComponent, boardColumn.cards, "cardOrder")
                            }
                        }
                        return boardColumn;
                    }
                )
            };
        });
    }

    //*********Column changer functions
    const arrangeColumns = (copyOfState, idOfDraggedParentComponent, indexWhereToPlace, indexOfDraggedComponent) => {
        return copyOfState.map(board => {
            if (board.id === idOfDraggedParentComponent) {
                return {
                    ...board,
                    boardColumns: arrangeArray(indexWhereToPlace, indexOfDraggedComponent, board.boardColumns, "columnOrder")
                };
            }
            return board;
        });
    }

    //*********Util functions
    const arrangeArray = (indexWhereToPlace, indexOfDraggedComponent, arrayToArrange, componentKey) => {
        const componentToChangePlace = getComponentByIndex(arrayToArrange, indexOfDraggedComponent);
        putComponentToPlace(indexWhereToPlace, componentToChangePlace, arrayToArrange);
        return adjustComponentOrderAttribute(arrayToArrange, componentKey);
    }
    const getComponentByIndex = (arrayToArrange, indexOfDraggedComponent) => {
        return arrayToArrange.splice(indexOfDraggedComponent, 1)[0];
    }
    const putComponentToPlace = (indexOfWhereToPlace, componentToChangePlace, arrayToArrange) => {
        arrayToArrange.splice(indexOfWhereToPlace, 0, componentToChangePlace);
    }
    const adjustComponentOrderAttribute = (componentToAdjust, componentKey) => {
        componentToAdjust = componentToAdjust.filter(Boolean);
        componentToAdjust = componentToAdjust.map((component, index) => {
            return {
                ...component,
                [componentKey]: index
            };
        });

        return componentToAdjust;
    };


    //*********Update methods*********

    //********* Card updaters
    const cardUpdaterForCardsWithChangedParents = async (copyOfState, idOfDropZoneParentComponent, boardId) =>{
        const cardsToUpdate = getsCardsThatNeedsUpdate(copyOfState, idOfDropZoneParentComponent, boardId);
        await updateCardsWithChangedParentsInDatabase(cardsToUpdate, idOfDropZoneParentComponent);
    }
    const getsCardsThatNeedsUpdate = (copyOfState, idOfDropZoneParentComponent, boardId) => {
        const board = copyOfState.find(board => board.id === boardId);
        const boardColumn = board.boardColumns.find(boardColumn => boardColumn.id === idOfDropZoneParentComponent);
        return [...boardColumn.cards];
    }
    const updateCardsWithChangedParentsInDatabase = async (cards, idOfDropZoneComponent) => {
        for (const card of cards) {
           await updateComponentInDatabase("/card/update-cards-board-columns",cardWithChangedParentsPayloadGenerator(card, idOfDropZoneComponent));
        }
    }
    const cardUpdater = async (copyOfState, idOfDropZoneParentComponent, boardId) => {
        const cardsToUpdate = getsCardsThatNeedsUpdate(copyOfState, idOfDropZoneParentComponent, boardId);
        await updateCards(cardsToUpdate);
    }
    const updateCards = async (cards) => {
        for (const card of cards) {
            await updateComponentInDatabase("/card", cardPayloadGenerator(card));
        }
    }

    //*********Column updaters
    const boardColumnUpdater = (copyOfState, idOfDropZoneParent) => {
        const board = getBoardColumnsThatNeedsUpdate(copyOfState, idOfDropZoneParent);
        updateBoardColumnsInDatabase([...board.boardColumns]);
    }
    const getBoardColumnsThatNeedsUpdate = (copyOfState,idOfDropZoneParentComponent) =>{
        return copyOfState.find(board => board.id === idOfDropZoneParentComponent);
    }
    const updateBoardColumnsInDatabase = (boardColumns) => {
        boardColumns.forEach(boardColumn =>
            updateComponentInDatabase("/board-column", boardColumnPayloadGenerator(boardColumn)));
    }

    //*********Payload Generators
    const boardColumnPayloadGenerator = (component) => {
        return {
            id: component.id,
            columnOrder: component.columnOrder
        };
    }
    const cardPayloadGenerator = (component) => {
        return {
            id: component.id,
            cardOrder: component.cardOrder
        };
    }
    const cardWithChangedParentsPayloadGenerator = (card, idOfDropZoneComponent) => {
        return {
            boardColumnId: idOfDropZoneComponent,
            card: card
        };
    }

    //*********Fetch
    const updateComponentInDatabase = async (url, payload) => {
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")},
            body: JSON.stringify(payload)
        });
    }

    return (
        <DragAndDropContext.Provider value={{componentArranger}}>
            {children}
        </DragAndDropContext.Provider>
    )
}

export const useComponentArranger = () => useContext(DragAndDropContext).componentArranger;
export default DragAndDropProvider;
