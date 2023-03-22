class ColumnOrderHandler {


    constructor(array,columnId, whereToPlace, orderOfColumnToDrop, isItBefore, boardId) {
        this.boards = [...array];
        this.columnId = columnId;
        this.whereToPlace = whereToPlace;
        this.orderOfColumnToDrop = orderOfColumnToDrop;
        this.isItBefore = isItBefore;
        this.boardId = boardId;
    }


    ArrangeColumns = () => {


        return this.boards.map(board => {
            if (board.id === this.boardId) {

                let reArrangedColumns = this.ArrangeColumnPosition()

                return {
                    ...board,
                    boardColumns: this.correctedColumnOrders(reArrangedColumns)
                }
            }
            return board
        })

    }

    ArrangeColumnPosition = () => {

        const columnToDrop = this.boards.boardColumns.splice(this.orderOfColumnToDrop, 1);

        this.boards.boardColumns.splice(this.correctWhereToPlace(), 0, columnToDrop[0])

        return this.correctedColumnOrders()
    }

    correctWhereToPlace = () => {
        if(this.whereToPlace > this.orderOfColumnToDrop){
            this.whereToPlace -= 1}
        return this.isItBefore ? this.whereToPlace : this.whereToPlace +1
    }

    correctedColumnOrders = (boardColumns) => {
        boardColumns.map(column => {
            return {...column, columnOrder: boardColumns.indexOf(column)}
        })
    }
}

export default ColumnOrderHandler;