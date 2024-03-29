package com.zkiss.proman.controller;

import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateResponse;
import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final JwtService jwtService;
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllBoardsByUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String header, @PathVariable("id") UUID id) {
        if (hasAuthorization(header, id)) {
            return ResponseEntity.ok().body(boardService.getAllBoardsByUserId(id));
        } else {
            return ResponseEntity.badRequest().body("Not authorized");
        }
    }

    @PostMapping()
    public ResponseEntity<BoardCreateResponse> createBoard(@Valid @RequestBody BoardCreateRequest createRequest) {
        Board board = boardService.createBoard(createRequest);
        return ResponseEntity.ok().body(new BoardCreateResponse(board));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable("id") Long id) {
        Integer deletedRecords = boardService.deleteBoard(id);
        if (deletedRecords > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Nothing deleted");
        }
    }

    protected boolean hasAuthorization(String header, UUID id) {
        String token = jwtService.extractToken(header);
        AppUser currentUser = userService.getAppUserByEmail(jwtService.extractEmail(token));
        return currentUser.getId().equals(id);
    }
}
