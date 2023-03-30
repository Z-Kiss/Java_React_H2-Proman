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


        if (needToChangeParentComponent(idOfDraggedParentComponent, idOfDropZoneParentComponent)) {
            const childrenToChangeParent = takeChildrenFromParent(copyOfState, idOfDraggedParentComponent, indexOfDraggedComponent);
            giveChildrenToParent(copyOfState, idOfDropZoneParentComponent, indexWhereToPlace, childrenToChangeParent);
        } else {
            if (isItCard(componentType)) {
                copyOfState = copyOfState.map(board => {
                    return {
                        ...board, boardColumns: board.boardColumns.map(boardColumn => {
                                if (boardColumn.id === idOfDropZoneParentComponent) {
                                    return {...boardColumn,
                                        cards: arrangeArray(indexWhereToPlace, indexOfDraggedComponent, boardColumn.cards, "cardOrder")}
                                }
                                return boardColumn
                            }
                        )
                    }
                })

            } else if (isItColumn(componentType)) {
                copyOfState = copyOfState.map(board => {
                    if (board.id === idOfDraggedParentComponent) {
                        return {
                            ...board,
                            boardColumns: arrangeArray(indexWhereToPlace, indexOfDraggedComponent, board.boardColumns, "columnOrder")
                        }
                    }
                    return board
                })
            }
        }

        setState(copyOfState);
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

    //This is where the "undefined" happens to born
    const adjustComponentOrderAttribute = (componentToAdjust, componentKey) => {
        return componentToAdjust.filter(Boolean).map((component, index) => {
            return {
                ...component,
                [componentKey]: index
            };
        });
    };


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