package com.zkiss.proman.controller;

import com.zkiss.proman.modal.Board;
import com.zkiss.proman.modal.BoardColumn;
import com.zkiss.proman.modal.DTO.boardDTO.BoardColumnCreateRequest;
import com.zkiss.proman.service.BoardColumnService;
import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/boardcolumn")
public class BoardColumnController {


    private BoardColumnService boardColumnService;

    private SessionService sessionService;

    public BoardColumnController(BoardColumnService boardColumnService, SessionService sessionService) {
        this.boardColumnService = boardColumnService;
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public void createNewBoardColumn(@RequestBody BoardColumnCreateRequest createRequest){
        boardColumnService.registerBoardColumn(createRequest);
    }

    @PostMapping("/update")
    public void updateBoardColumn(@RequestBody BoardColumn boardColumn){
        boardColumnService.update(boardColumn);
    }


}
