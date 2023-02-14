package com.zkiss.proman.service;

import com.zkiss.proman.modal.AppUser;
import com.zkiss.proman.modal.Board;
import com.zkiss.proman.modal.DTO.boardDTO.BoardCreateRequest;
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

    public void createBoard(BoardCreateRequest createRequest) {
        if (sessionService.get("userId") == -1L) {
            boardRepository.save(new Board(createRequest, null));
        } else {
            AppUser user = userService.getAppUserById(sessionService.get("userId"));
            Board board = new Board(createRequest, user);
            boardRepository.save(board);

        }
    }


    public List<Board> getAllBoardsByUser(Long userId) {
        return boardRepository.getBoardsByAppUser_Id(userId);
    }

    public List<Board> getAllBoardsByGuest() {
       return boardRepository.getBoardsByAppUser_Id(null);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }
}
