package com.zkiss.proman.controller;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateResponse;
import com.zkiss.proman.service.BoardColumnService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board-column")
@RequiredArgsConstructor
public class BoardColumnController {

    private final BoardColumnService boardColumnService;


    @PostMapping()
    public ResponseEntity<BoardColumnCreateResponse> createNewBoardColumn(@Valid @RequestBody BoardColumnCreateRequest createRequest) {
        try {
            BoardColumn savedBoardColumn = boardColumnService.creatBoardColumn(createRequest);
            return ResponseEntity.status(201).body(new BoardColumnCreateResponse(savedBoardColumn));
        } catch (EntityNotFoundException error) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping()
    public ResponseEntity<?> updateBoardColumn(@RequestBody BoardColumn boardColumn) {
        try {
            boardColumnService.updateBoardColumn(boardColumn);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException error) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoardColumn(@PathVariable("id") Long id) {
        Integer deletedRecords = boardColumnService.deleteBoardColum(id);
        if (deletedRecords > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

}
