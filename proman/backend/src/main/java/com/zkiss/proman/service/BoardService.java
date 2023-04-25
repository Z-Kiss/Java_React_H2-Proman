package com.zkiss.proman.service;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.repository.BoardRepository;
import com.zkiss.proman.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserService userService;
    private final SessionService sessionService;

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

    public List<Board> getAllBoardsByUserId(UUID userId) {
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

    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
