package com.zkiss.proman.model.DTO.boardcolumnDTO;

import com.zkiss.proman.model.BoardColumn;
import lombok.Data;

//TODO modify Response to only send BoardColumn and Frontend to accept it
@Data
public class BoardColumnCreateResponse {

    private Long boardId;

    private BoardColumn boardColumn;

    public BoardColumnCreateResponse(BoardColumn boardColumn) {
        this.boardId = boardColumn.getBoard().getId();
        this.boardColumn = boardColumn;
    }
}