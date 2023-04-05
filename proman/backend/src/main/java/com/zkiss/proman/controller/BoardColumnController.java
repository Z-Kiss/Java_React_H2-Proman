package com.zkiss.proman.controller;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnDeleteRequest;
import com.zkiss.proman.model.DTO.boardDTO.CreateBoardResponse;
import com.zkiss.proman.model.DTO.boardcolumnDTO.CreateBoardColumnResponse;
import com.zkiss.proman.service.BoardColumnService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boardcolumn")
public class BoardColumnController {

    private BoardColumnService boardColumnService;


    public BoardColumnController(BoardColumnService boardColumnService) {
        this.boardColumnService = boardColumnService;
    }

    @PostMapping("/create")
    public ResponseEntity<CreateBoardColumnResponse> createNewBoardColumn(@RequestBody BoardColumnCreateRequest createRequest){
        if(createRequest.hasNoNullField()){
            CreateBoardColumnResponse response = boardColumnService.registerBoardColumn(createRequest);
            return ResponseEntity.ok().body(response);
        }else {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("/update")
    public void updateBoardColumn(@RequestBody BoardColumn boardColumn){
        boardColumnService.update(boardColumn);
    }

    @DeleteMapping
    public void deleteBoardColumn(@RequestBody BoardColumnDeleteRequest deleteRequest){

        boardColumnService.delete(deleteRequest);
    }


}
