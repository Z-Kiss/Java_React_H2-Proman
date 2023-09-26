package com.zkiss.proman.service;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateResponse;
import com.zkiss.proman.repository.BoardColumnRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardColumnService {

    private final BoardService boardService;
    private final BoardColumnRepository boardColumnRepository;

    @Transactional
    public BoardColumnCreateResponse creatBoardColumn(BoardColumnCreateRequest createRequest) {
        Board board = boardService.getBoardById(createRequest.getBoardId());
        BoardColumn savedBoardColumn = boardColumnRepository.save(new BoardColumn(createRequest, board));
        this.updateBoardWithBoardColumn(board, savedBoardColumn);
        return new BoardColumnCreateResponse(board.getId(), savedBoardColumn);
    }
    private void updateBoardWithBoardColumn(Board board, BoardColumn boardColumn){
        board.addBoardColumn(boardColumn);
        boardService.updateBoard(board);
    }

    @Transactional
    public void updateBoardColumn(BoardColumn updatedBoardColumn) {
        BoardColumn boardColumn = boardColumnRepository.findById(updatedBoardColumn.getId())
                .orElseThrow(EntityNotFoundException::new);
        boardColumn.update(updatedBoardColumn);
        boardColumnRepository.save(boardColumn);
    }
    @Transactional
    public Integer deleteBoardColum(Long id) {
        return boardColumnRepository.deleteBoardColumnById(id);
    }
    @Transactional
    public BoardColumn getBoardColumnById(Long boardColumnId) {
        return boardColumnRepository.findById(boardColumnId).orElseThrow(EntityNotFoundException::new);
    }


}
