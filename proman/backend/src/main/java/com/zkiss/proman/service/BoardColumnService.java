package com.zkiss.proman.service;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateResponse;
import com.zkiss.proman.repository.BoardColumnRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardColumnService {

    private final BoardService boardService;
    private final BoardColumnRepository boardColumnRepository;

    @Transactional
    public BoardColumnCreateResponse registerBoardColumn(BoardColumnCreateRequest createRequest) {
        Board board = boardService.getBoardById(createRequest.getBoardId());
        BoardColumn boardColumn = new BoardColumn(createRequest, board);
        boardColumnRepository.save(boardColumn);
        board.addBoardColumn(boardColumn);
        boardService.updateBoard(board);
        return new BoardColumnCreateResponse(board.getId(), boardColumn);
    }

    @Transactional
    public void update(BoardColumn updatedBoardColumn) {
        BoardColumn boardColumn = boardColumnRepository.getBoardColumnById(updatedBoardColumn.getId());
        boardColumn.update(updatedBoardColumn);
        boardColumnRepository.save(boardColumn);
    }
    @Transactional
    public void delete(Long id) {
        boardColumnRepository.deleteById(id);
    }
    @Transactional
    public BoardColumn getBoardColumnById(Long boardColumnId) {
        return boardColumnRepository.getBoardColumnById(boardColumnId);
    }
}
