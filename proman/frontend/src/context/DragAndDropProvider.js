import {createContext, useContext} from "react";
// const [idOfDraggedComponent,
//     idOfDraggedParentComponent,
//     indexOfDraggedComponent,
//     indexWhereToPlaceDraggedComponent] = DraggedComponentProps
//
// const [idOfDropZoneComponent,
//     idOfDropZoneParentComponent,
//     indexOfDropZoneComponent,
//     indexWhereToPlaceDropZoneComponent] = DropZoneComponentProps
//TODO should I pack out the variables?
//[Dragged, DropZone] = name
// prop in Props
//idOf[name]Component,idOf[name]ParentComponent,indexOf[name]Component,indexWhereToPlace[name]Component
//TODO ask If correctOrderAttribute is needed or not?


const DragAndDropContext = createContext({});

const DragAndDropProvider = ({children, currentState, setState}) => {


    const isItCard = (componentType) => {
        return componentType === "card";
    }

    const isItColumn = (componentType) => {
        return componentType === "column";
    }

    const needToChangeParentComponent = (idOfDraggedParentComponent, idOfDropZoneParentComponent) => {
        return idOfDropZoneParentComponent !== idOfDraggedParentComponent;
    }

    const componentArranger = (changeProps) => {


        const {DraggedComponentProps, DropZoneComponentProps, componentType, boardId} = changeProps;

        const {idOfDraggedParentComponent, indexOfDraggedComponent} = DraggedComponentProps;

        const {idOfDropZoneParentComponent, indexWhereToPlace} = DropZoneComponentProps;


        let copyOfState = [...currentState];
        let updatedDatabase = false;
        console.log("idOFdraggedParent",idOfDraggedParentComponent, indexOfDraggedComponent,"idOfDropZone", idOfDropZoneParentComponent, indexWhereToPlace)
        if (needToChangeParentComponent(idOfDraggedParentComponent, idOfDropZoneParentComponent)) {

            console.log("happening")
            changeParentsOfComponent(copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent, idOfDropZoneParentComponent, indexWhereToPlace);

            cardUpdaterForCardsWithChangedParents(copyOfState, idOfDropZoneParentComponent, boardId)
        } else {
            if (isItCard(componentType)) {
                copyOfState = arrangeCards(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent);
                cardUpdater(copyOfState, idOfDropZoneParentComponent, boardId)
            } else if (isItColumn(componentType)) {
                copyOfState = arrangeColumns(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent);
                boardColumnUpdater(copyOfState, idOfDropZoneParentComponent)
            }
        }
        setState(copyOfState);
    }

    //*********Array manipulator methods***********

    //Card changer functions
    const changeParentsOfComponent = (copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent, idOfDropZoneParentComponent, indexWhereToPlace) => {
        const childrenToChangeParent = takeChildrenFromParent(copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent);
        giveChildrenToParent(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, childrenToChangeParent);
    }
    const takeChildrenFromParent = (currentState, idOfDraggedParentComponent, indexOfDraggedComponent) => {
        let takenChildren;
        currentState.map(board => {

            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === idOfDraggedParentComponent) {

                        takenChildren = boardColumn.cards.splice(indexOfDraggedComponent, 1)

                        return {
                            ...boardColumn,
                            cards: adjustComponentOrderAttribute([...boardColumn.cards], "cardOrder")
                        }
                    }
                    return boardColumn;
                })
            }
        })

        return takenChildren[0];
    }
    const giveChildrenToParent = (currentState, idOfDropZoneParentComponent, indexWhereToPlace, childComponent) => {
        return currentState.map(board => {

            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === idOfDropZoneParentComponent) {

                        boardColumn.cards.splice(indexWhereToPlace, 0, childComponent)

                        return {...boardColumn, cards: adjustComponentOrderAttribute(boardColumn.cards, "cardOrder")}
                    }
                    return boardColumn;
                })

            }
        })
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
                        return boardColumn
                    }
                )
            }
        })
    }

    //Column changer functions
    const arrangeColumns = (copyOfState, idOfDraggedParentComponent, indexWhereToPlace, indexOfDraggedComponent) => {
        return copyOfState.map(board => {
            if (board.id === idOfDraggedParentComponent) {
                return {
                    ...board,
                    boardColumns: arrangeArray(indexWhereToPlace, indexOfDraggedComponent, board.boardColumns, "columnOrder")
                }
            }
            return board
        })
    }

    // Util functions
    const arrangeArray = (indexWhereToPlace, indexOfDraggedComponent, arrayToArrange, componentKey) => {
        const componentToChangePlace = getComponentByIndex(arrayToArrange, indexOfDraggedComponent)

        putComponentToPlace(indexWhereToPlace, componentToChangePlace, arrayToArrange)

        return adjustComponentOrderAttribute(arrayToArrange, componentKey)


    }
    const getComponentByIndex = (arrayToArrange, indexOfDraggedComponent) => {
        return arrayToArrange.splice(indexOfDraggedComponent, 1)[0]
    }
    const putComponentToPlace = (indexOfWhereToPlace, componentToChangePlace, arrayToArrange) => {
        arrayToArrange.splice(indexOfWhereToPlace, 0, componentToChangePlace)
    }
    const adjustComponentOrderAttribute = (componentToAdjust, componentKey) => {
        return componentToAdjust.filter(Boolean).map((component, index) => {
            return {
                ...component,
                [componentKey]: index
            };
        });
    };


    //*******Update methods*********

    // Card updaters
    const cardUpdaterForCardsWithChangedParents = (copyOfState, idOfDropZoneParentComponent, boardId) =>{
        const cardsToUpdate = getsCardsThatNeedsUpdate(copyOfState, idOfDropZoneParentComponent, boardId);
        updateCardsWithChangedParentsInDatabase(cardsToUpdate, idOfDropZoneParentComponent);
    }
    const getsCardsThatNeedsUpdate = (copyOfState, idOfDropZoneParentComponent, boardId) => {
        const board = copyOfState.find(board => board.id === boardId)
        const boardColumn = board.boardColumns.find(boardColumn => boardColumn.id === idOfDropZoneParentComponent)
        return [...boardColumn.cards]
    }
    const updateCardsWithChangedParentsInDatabase = async (cards, idOfDropZoneComponent) => {
        for (const card of cards) {
            updateComponentInDatabase("card/update-cards",cardWithChangedParentsPayloadGenerator(card, idOfDropZoneComponent))
        }
    }
    const cardUpdater = (copyOfState, idOfDropZoneParentComponent, boardId) => {
        const cardsToUpdate = getsCardsThatNeedsUpdate(copyOfState, idOfDropZoneParentComponent, boardId);
        updateCards(cardsToUpdate);
    }
    const updateCards = (cards) => {
        cards.forEach(card => updateComponentInDatabase("card/update-single-card", cardPayloadGenerator(card)));
    }

    //Column updaters
    const boardColumnUpdater = (copyOfState, idOfDropZoneParent) => {
        const board = getBoardColumnsThatNeedsUpdate(copyOfState, idOfDropZoneParent);
        updateBoardColumnsInDatabase([...board.boardColumns]);
    }
    const getBoardColumnsThatNeedsUpdate = (copyOfState,idOfDropZoneParentComponent) =>{
        return copyOfState.find(board => board.id === idOfDropZoneParentComponent);
    }
    const updateBoardColumnsInDatabase = (boardColumns) => {

        // for (const boardColumn in boardColumns) {
        //     updateComponentInDatabase("/boardcolumn/update", boardColumnPayloadGenerator(boardColumn))
        // }
        boardColumns.forEach(boardColumn =>
            updateComponentInDatabase("/boardcolumn/update", boardColumnPayloadGenerator(boardColumn)));
    }

    //Payload Generators
    const boardColumnPayloadGenerator = (component) => {

        return {
            id: component.id,
            columnOrder: component.columnOrder
        }
    }
    const cardPayloadGenerator = (component) => {
        return {
            id: component.id,
            cardOrder: component.cardOrder
        }
    }
    const cardWithChangedParentsPayloadGenerator = (component, idOfDropZoneComponent) => {
        return {
            boardColumnId: idOfDropZoneComponent,
            card: {
                id: component.id,
                cardOrder: component.cardOrder
            }
        }
    }

    //Fetch
    const updateComponentInDatabase = async (url, payload) => {
        await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
    }

    return (
        <DragAndDropContext.Provider value={{componentArranger}}>
            {children}
        </DragAndDropContext.Provider>
    )


}


export const useComponentArranger = () => useContext(DragAndDropContext).componentArranger;
export default DragAndDropProvider;