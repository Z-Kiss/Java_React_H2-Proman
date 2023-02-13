package com.zkiss.proman.controller;

import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.SessionService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

    private BoardService boardService;

    private SessionService sessionService;

    public BoardController(BoardService boardService, SessionService sessionService) {
        this.boardService = boardService;
        this.sessionService = sessionService;
    }


}
