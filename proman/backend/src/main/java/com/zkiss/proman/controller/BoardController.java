package com.zkiss.proman.controller;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateResponse;
import com.zkiss.proman.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping()
    public List<Board> getAllBoards() {
        return boardService.getAllBoards();
    }

    @GetMapping("/{id}")
    public List<Board> getAllBoardsByUser(@PathVariable("id") UUID id) {
        return boardService.getAllBoardsByUserId(id);
    }

    @PostMapping()
    public ResponseEntity<BoardCreateResponse> createBoard(@Valid @RequestBody BoardCreateRequest createRequest) {
        Board board = boardService.createBoard(createRequest);
        return ResponseEntity.ok().body(new BoardCreateResponse(board));
    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable("id") Long id) {
        boardService.deleteBoard(id);
    }


}
