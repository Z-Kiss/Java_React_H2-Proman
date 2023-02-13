package com.zkiss.proman.controller;

import com.zkiss.proman.modal.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.SessionService;
import org.apache.catalina.connector.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
public class BoardController {

    private BoardService boardService;

    private SessionService sessionService;

    public BoardController(BoardService boardService, SessionService sessionService) {
        this.boardService = boardService;
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public void createBoard(@RequestBody BoardCreateRequest createRequest){
        boardService.createBoard(createRequest);
    }

}
