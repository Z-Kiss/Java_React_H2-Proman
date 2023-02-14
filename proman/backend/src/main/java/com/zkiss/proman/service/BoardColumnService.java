package com.zkiss.proman.service;

import com.zkiss.proman.modal.Board;
import com.zkiss.proman.modal.BoardColumn;
import com.zkiss.proman.modal.DTO.boardDTO.BoardColumnCreateRequest;
import com.zkiss.proman.repository.BoardColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardColumnService {

    private BoardService boardService;
    private SessionService sessionService;
    private BoardColumnRepository boardColumnRepository;
    @Autowired
    public BoardColumnService(BoardService boardService, SessionService sessionService, BoardColumnRepository boardColumnRepository) {
        this.boardService = boardService;
        this.sessionService = sessionService;
        this.boardColumnRepository = boardColumnRepository;
    }

    public void registerBoardColumn(BoardColumnCreateRequest createRequest) {
        Board board = boardService.getBoardById(createRequest.getBoardId());
        BoardColumn boardColumn = new BoardColumn(createRequest, board);
        boardColumnRepository.save(boardColumn);
        board.addBoardColumn(boardColumn);
        boardService.updateBoard(board);
    }

    public void update(BoardColumn updatedBoardColumn) {
        BoardColumn boardColumn = boardColumnRepository.getBoardColumnById(updatedBoardColumn.getId());
        boardColumn.update(updatedBoardColumn);
        boardColumnRepository.save(boardColumn);
    }
}
