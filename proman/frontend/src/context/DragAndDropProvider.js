import {createContext, useContext, useEffect, useState} from "react";
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

    // let copyOfState;
    //
    // const initializeDnd = () => {
    //     copyOfState = [...currentState]
    // }


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


        const {DraggedComponentProps, DropZoneComponentProps, componentType} = changeProps;

        const {idOfDraggedComponent, idOfDraggedParentComponent, indexOfDraggedComponent} = DraggedComponentProps;

        const {idOfDropZoneComponent, idOfDropZoneParentComponent, indexWhereToPlace} = DropZoneComponentProps;


        let copyOfState = [...currentState];
        let updatedDatabase = false;

        if (isItCard(componentType)) {

            if (needToChangeParentComponent(idOfDraggedParentComponent, idOfDropZoneParentComponent)) {
                changeParentsOfComponent(copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent, idOfDropZoneParentComponent, indexWhereToPlace);
            } else {
                copyOfState = arrangeCards(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent);
            }

            cardUpdater(copyOfState, idOfDropZoneParentComponent)
        } else if (isItColumn(componentType)) {
            copyOfState = arrangeColumns(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, indexOfDraggedComponent);
        }


        setState(copyOfState);
    }

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

    const cardUpdater = (copyOfState, idOfDropZoneParentComponent) =>{
        const cardsToUpdate = getsCardsThatNeedsUpdate(copyOfState, idOfDropZoneParentComponent);
        console.log(cardsToUpdate)
        updateCardsInDatabase(cardsToUpdate);
    }
    const getsCardsThatNeedsUpdate = (copyOfState, idOfDropZoneParentComponent) => {

        console.log(boardColumn)
        return boardColumn.cards
    }
    const updateBoardColumnsInDatabase = (boardColumns) => {
        let result = [];
        for (let boardColumn in boardColumns) {
            result.push(updateComponentInDatabase("/boardcolumn/update", boardColumnPayloadGenerator(boardColumn)))
        }
        console.log(result)
    }

    const updateCardsInDatabase = async (cards) => {
        console.log(cards)
        let result = [];
        for (let card in cards) {
            console.log(card)
            result.push(await updateComponentInDatabase("/boardcolumn/update", cardPayloadGenerator(card)))
        }
        console.log(result)
    }


    const boardColumnPayloadGenerator = (component) => {
        return {
            id: component.id,
            columnOrder: component.columnOrder
        }
    }
    const cardPayloadGenerator = (component, idOfDropZoneComponent) => {
        return {
            boardColumnId: idOfDropZoneComponent,
            card: {
                id: component.id,
                cardOrder: component.cardOrder
            }
        }
    }

    const updateComponentInDatabase = async (url, payload) => {

        await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        }).then((response) => {
            console.log(response.status)
            return response.status === 200
        })
    }

    return (
        <DragAndDropContext.Provider value={{componentArranger}}>
            {children}
        </DragAndDropContext.Provider>
    )


}

// export const useCopyOfState = () => useContext(DragAndDropContext).copyOfState;

// export const useInitDnd = () => useContext(DragAndDropContext).initializeDnd;
export const useComponentArranger = () => useContext(DragAndDropContext).componentArranger;
export default DragAndDropProvider;