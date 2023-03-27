import * as React from 'react'
import {useEffect, useState} from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/navbar/ModalContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Boards from "./component/board/Table";


export default function App() {
    const [modalContent, setModalContent] = useState(null)
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [boards, setBoards] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initBoardsGuest = async () => {
        const response = await fetch("board/get-all-guest-boards")
        if (response.status === 200) {
            setBoards(await response.json())
        } else {
            console.log("nope")
        }
    }
    const initBoardsUser = async () => {
        const response = await fetch("board/get-all-boards-by-user")
        if (response.status === 200) {
            setBoards(await response.json())
        } else {
            console.log("nope")
        }
    }

    const createNewObject = async (payload, url) => {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        return response;
    }

    useEffect(() => {
        if (loggedInUser === null) {
            initBoardsGuest();
        } else {
            initBoardsUser();
        }
    }, [loggedInUser])

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        loggedInUser: loggedInUser,
        setLoggedInUser: setLoggedInUser,
        handleShow: handleShow,
        handleClose: handleClose,
    }

    const createComponentProps = {
        initBoardsUser: initBoardsUser,
        createNewObject: createNewObject,
    }

    const createBoardProps = {
        createComponent: createComponentProps,
        placement: "bottom",
        buttonStyle: "primary",
        buttonTitle: "Create Board",
        url: "/board/create"
    }
    const createColumnProps = {
        createComponent: createComponentProps,
        placement: "right",
        buttonStyle: "outline-dark",
        buttonTitle: "Add Column",
        url: "/boardcolumn/create"
    }
    const createCardProps = {
        createComponent: createComponentProps,
        placement: "right",
        buttonStyle: "outline-dark btn-sm",
        buttonTitle: "+",
        url: "/card/create"
    }


    const columnOrderManager = (columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId) => {

        const newBoardState = columnOrderHandler(columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId)

        const updatedBoard = newBoardState.find(board => board.id === boardId);

        const result = columnOrderUpdater(boardId, updatedBoard.boardColumns)
        if (result) {
            setBoards(newBoardState)
        }

    }
    const columnOrderHandler = (columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId) => {
        return boards.map(board => {
            if (board.id === boardId) {
                return {
                    ...board,
                    boardColumns: reArrangeColumn(whereToPlace, isItBefore, orderOfColumnToDrop, board.boardColumns)
                }
            }
            return board
        })

    }
    const reArrangeColumn = (whereToPlace, isItBefore, orderOfColumnToDrop, boardColumns) => {

        const columnToDrop = boardColumns.splice(orderOfColumnToDrop, 1);


        boardColumns.splice(correctWhereToPlace(whereToPlace, isItBefore, orderOfColumnToDrop), 0, columnToDrop[0])

        return boardColumns.map(column => {
            return {...column, columnOrder: boardColumns.indexOf(column)}
        })

    }

    const columnOrderUpdater = async (boardId, boardColumns) => {
        const promises = []

        for (const boardColumn of boardColumns) {
            promises.push(await updateOneColumn(boardColumn));
        }

        return promises.every(promise => promise.isFulfilled)

    }

    const updateOneColumn = async (boardColumn) => {
        return await fetch("boardcolumn/update", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(columnPayloadGenerator(boardColumn))
        });
    }

    const columnPayloadGenerator = (boardColumn) => {
        const payload = {
            id: boardColumn.id,
            columnOrder: boardColumn.columnOrder
        }

        return payload
    }

    const correctWhereToPlace = (whereToPlace, isItBefore, orderOfColumnToDrop) => {
        if (whereToPlace > orderOfColumnToDrop) {
            whereToPlace -= 1
        }
        return isItBefore ? whereToPlace : whereToPlace + 1
    }

    const cardOrderManager = (cardId, whereToPlace, orderOfCardToDrop, isItBefore, columnFromId, columnToId) => {

        let newBoardState = [...boards];

        if (columnFromId !== columnToId) {
            newBoardState = changeColumnOfCard(newBoardState, orderOfCardToDrop, columnFromId, columnToId, whereToPlace, isItBefore)

        } else {
            newBoardState = cardOrderHandler(newBoardState, cardId, whereToPlace, orderOfCardToDrop, isItBefore, columnFromId)

        }

        const fulfilled = cardsOrderUpdater(newBoardState,columnFromId,columnToId)

        if(fulfilled){
            setBoards(newBoardState)
        }


    }

    const changeColumnOfCard = (newBoardState, orderOfCardToDrop, columnFromId, columnToId, whereToPlace, isItBefore) => {
        let cardToSwitch = undefined;
        newBoardState = newBoardState.map(board => {

            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === columnFromId) {

                        cardToSwitch = boardColumn.cards.splice(orderOfCardToDrop, 1)

                        return {...boardColumn, cards: correctCardOrder(boardColumn.cards)}
                    }
                    return boardColumn;
                })
            }
        })
        return newBoardState.map(board => {

            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === columnToId) {

                        boardColumn.cards.splice(correctWhereToPlace(whereToPlace, isItBefore, orderOfCardToDrop), 0, cardToSwitch[0])

                        return {...boardColumn, cards: correctCardOrder(boardColumn.cards)}
                    }
                    return boardColumn;
                })

            }
        })


    }

    const cardOrderHandler = (newBoardState, cardId, whereToPlace, orderOfCardToDrop, isItBefore, boardColumnId) => {
        return newBoardState.map(board => {
            return {
                ...board, boardColumns: board.boardColumns.map(boardColumn => {
                    if (boardColumn.id === boardColumnId) {

                        const newCards = reArrangeCard(whereToPlace, isItBefore, orderOfCardToDrop, boardColumn.cards)

                        return {...boardColumn, cards: newCards}
                    }
                    return boardColumn
                })
            }
        })

    }

    const reArrangeCard = (whereToPlace, isItBefore, orderOfCardToDrop, cards) => {

        const cardToDrop = cards.splice(orderOfCardToDrop, 1);

        cards.splice(correctWhereToPlace(whereToPlace, isItBefore, orderOfCardToDrop), 0, cardToDrop[0])

        return correctCardOrder(cards)
    }

    const correctCardOrder = (cards) => {
        return cards.map(card => {
            return {...card, cardOrder: cards.indexOf(card)}

        })
    }

    const cardsOrderUpdater = (newBoardState, columnFromId, columnToId) => {
        const promises = []

        newBoardState.forEach(board => {

            board.boardColumns.forEach(async boardColumn => {

                if (boardColumn.id === columnFromId) {
                    for (const card of boardColumn.cards) {
                        promises.push(await updateOneCard(card, boardColumn.id));
                    }
                } else if (boardColumn.id === columnToId){
                    for (const card of boardColumn.cards) {
                        promises.push(await updateCardAndColumns(card, boardColumn.id));
                    }
                }
            })
        })
        return promises.every(promise => promise.isFulfilled )
    }


    const updateOneCard = async (card) => {
        const resp = await fetch("/card/update-single-card", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cardPayloadGenerator(card))
        })
        return resp.status
    }

    const updateCardAndColumns = async (card, boardColumnId) => {
        const resp = await fetch("/card/update-cards", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cardPayloadGeneratorWithBoardColumn(card, boardColumnId))
        })
        return resp.status
    }


    const cardPayloadGenerator = (card) => {
        return {
            id: card.id,
            cardOrder: card.cardOrder,
        }
    }

    const cardPayloadGeneratorWithBoardColumn = (card, boardColumnId) =>{
        return {
            boardColumnId: boardColumnId,
            card:{id: card.id,
                cardOrder: card.cardOrder,}

        }
    }

    return (
        <>

            <Navbar props={props} createBoardProps={createBoardProps}/>
            <ModalContainer props={props}/>
            <Boards boards={boards} props={props} createColumnProps={createColumnProps}
                    createCardProps={createCardProps} columnOrderManager={columnOrderManager}
                    cardOrderManager={cardOrderManager}/>

        </>
    )
}
