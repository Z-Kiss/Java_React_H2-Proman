import * as React from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/navbar/ModalContainer";
import {useEffect, useState} from "react";
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
        placement: "left",
        buttonStyle: "outline-dark btn-sm",
        buttonTitle: "+",
        url: "/card/create"
    }


    const columnOrderManager = (columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId) => {

        const newBoardState = columnOrderHandler(columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId)

        const updatedBoard = newBoardState.find(board => board.id === boardId);
        const result = columnOrderUpdater(boardId, updatedBoard.boardColumns)
        if (result){
            setBoards(newBoardState)
        }



    }

    const columnOrderUpdater = (boardId, boardColumns ) => {
        const promises = []
        // boardColumns.forEach(boardColumn =>promises.push(updateOneColumn(boardId,boardColumn)));
        boardColumns.forEach(boardColumn =>updateOneColumn(boardColumn));
        return promises.every(promise => promise === 200)
    }

    const payloadGenerator = (boardColumn) =>{
        const payload = {
            id:boardColumn.id,
            columnOrder: boardColumn.columnOrder
        }

        return payload
    }

    const updateOneColumn = async (boardColumn) =>{
        const resp = await fetch("boardcolumn/update",{
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payloadGenerator(boardColumn))
        })
        return resp.status
    }

    const columnOrderHandler = (columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId) => {
        return  boards.map(board => {
            if (board.id === boardId) {
                return {...board, boardColumns: reArrangeColumn(whereToPlace, isItBefore, orderOfColumnToDrop, board.boardColumns)}
            }
            return board
        })

    }

    const reArrangeColumn = (whereToPlace, isItBefore, orderOfColumnToDrop, boardColumns) =>{

        const columnToDrop = boardColumns.splice(orderOfColumnToDrop,1);

        boardColumns.splice(correctWhereToPlace(whereToPlace, isItBefore, orderOfColumnToDrop), 0, columnToDrop[0])

        return  boardColumns.map(column => {
            return {...column, columnOrder: boardColumns.indexOf(column)}
        })


    }

    const correctWhereToPlace = (whereToPlace, isItBefore, orderOfColumnToDrop) =>{
            if(whereToPlace > orderOfColumnToDrop){
                whereToPlace -= 1}
            return isItBefore ? whereToPlace : whereToPlace +1
    }


    return (
        <>

            <Navbar props={props} createBoardProps={createBoardProps}/>
            <ModalContainer props={props}/>
            <Boards boards={boards} props={props} createColumnProps={createColumnProps}
                    createCardProps={createCardProps} columnOrderManager={columnOrderManager}/>

        </>
    )
}
