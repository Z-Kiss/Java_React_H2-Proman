package com.zkiss.proman.service;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardDTO.BoardDeleteRequest;
import com.zkiss.proman.repository.BoardRepository;
import com.zkiss.proman.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private BoardRepository boardRepository;

    private UserService userService;

    private SessionService sessionService;
    private final UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, UserService userService, SessionService sessionService,
                        UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userService = userService;
        this.sessionService = sessionService;
        this.userRepository = userRepository;
    }

    public Board createBoard(BoardCreateRequest createRequest) {
        Board board;
        if (sessionService.get("userId") == null) {
            board = new Board(createRequest, null);
            boardRepository.save(board);
        } else {
            AppUser user = userService.getAppUserById(sessionService.get("userId"));

            board = new Board(createRequest, user);

            boardRepository.save(board);
        }
        return board;
    }


    public List<Board> getAllBoardsByUserId(Long userId) {
        return boardRepository.getBoardsByAppUser_Id(userId);
    }

    public List<Board> getAllBoardsByGuest() {
       return boardRepository.getBoardsByAppUser_Id(null);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }


    public void updateBoard(Board updatedBoard) {
        Board board = getBoardById(updatedBoard.getId());
        board.update(updatedBoard);
        boardRepository.save(board);
    }

    public Board getBoardById(Long boardId) {
        return boardRepository.getBoardById(boardId);
    }

    public void deleteBoard(BoardDeleteRequest deleteRequest) {
        boardRepository.deleteById(deleteRequest.getId());
    }
}
