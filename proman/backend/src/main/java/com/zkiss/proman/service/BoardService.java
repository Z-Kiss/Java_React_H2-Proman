package com.zkiss.proman.service;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserService userService;

    @Transactional
    public Board createBoard(BoardCreateRequest createRequest) {
        AppUser user = userService.getAppUserById(createRequest.getUserId());
        Board newBoard = new Board(createRequest, user);
        boardRepository.save(newBoard);
        return newBoard;
    }

    public List<Board> getAllBoardsByUserId(UUID userId) {
        return boardRepository.getBoardsByAppUser_Id(userId);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }
    @Transactional
    public void updateBoard(Board updatedBoard) {
        Board board = getBoardById(updatedBoard.getId());
        board.update(updatedBoard);
        boardRepository.save(board);
    }

    public Board getBoardById(Long boardId) {
        return boardRepository.getBoardById(boardId);
    }
    @Transactional
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
