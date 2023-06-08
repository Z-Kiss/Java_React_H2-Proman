package com.zkiss.proman.controller;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardDTO.CreateBoardResponse;
import com.zkiss.proman.service.BoardService;
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

    @PostMapping("/create")
    public ResponseEntity<CreateBoardResponse> createBoard(@RequestBody BoardCreateRequest createRequest){
        if(createRequest.hasNoNullField()){
            Board board = boardService.createBoard(createRequest);
            return ResponseEntity.ok().body(new CreateBoardResponse(board));
        }else {
            return ResponseEntity.status(400).build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable("id") Long id){
        boardService.deleteBoard(id);
    }

    @GetMapping("/get-all-boards")
    public List<Board> getAllBoards(){
        return boardService.getAllBoards();
    }

    @GetMapping("/get-boards-by-id/{id}")
    public List<Board> getAllBoardsByUser(@PathVariable("id") UUID id){
        return boardService.getAllBoardsByUserId(id);
    }


}
