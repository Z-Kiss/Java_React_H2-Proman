package com.zkiss.proman.controller;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateResponse;
import com.zkiss.proman.service.BoardColumnService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board-column")
public class BoardColumnController {

    private final BoardColumnService boardColumnService;

    public BoardColumnController(BoardColumnService boardColumnService) {
        this.boardColumnService = boardColumnService;
    }

    @PostMapping()
    public ResponseEntity<BoardColumnCreateResponse> createNewBoardColumn(@Valid @RequestBody BoardColumnCreateRequest createRequest) {
        try{
            BoardColumnCreateResponse response = boardColumnService.creatBoardColumn(createRequest);
            return ResponseEntity.ok().body(response);
        }catch (EntityNotFoundException error){
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping()
    public ResponseEntity<?> updateBoardColumn(@RequestBody BoardColumn boardColumn) {
        try{
            boardColumnService.update(boardColumn);
            return ResponseEntity.ok().build();
        }catch (EntityNotFoundException error){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteBoardColumn(@PathVariable("id") Long id) {
        boardColumnService.delete(id);
    }

}
