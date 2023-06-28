package com.zkiss.proman.service;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.CreateBoardColumnResponse;
import com.zkiss.proman.repository.BoardColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardColumnService {

    private final BoardService boardService;
    private final BoardColumnRepository boardColumnRepository;

    public CreateBoardColumnResponse registerBoardColumn(BoardColumnCreateRequest createRequest) {
        Board board = boardService.getBoardById(createRequest.getBoardId());
        BoardColumn boardColumn = new BoardColumn(createRequest, board);
        boardColumnRepository.save(boardColumn);
        board.addBoardColumn(boardColumn);
        boardService.updateBoard(board);
        return new CreateBoardColumnResponse(board.getId(), boardColumn);
    }

    public void update(BoardColumn updatedBoardColumn) {
        BoardColumn boardColumn = boardColumnRepository.getBoardColumnById(updatedBoardColumn.getId());
        boardColumn.update(updatedBoardColumn);
        boardColumnRepository.save(boardColumn);
    }

    public void delete(Long id) {
        boardColumnRepository.deleteById(id);
    }

    public BoardColumn getBoardColumnById(Long boardColumnId) {
        return boardColumnRepository.getBoardColumnById(boardColumnId);
    }
}
