package com.zkiss.proman.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.service.BoardColumnService;
import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.CardService;
import com.zkiss.proman.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TestHelper {

    private final UserService userService;
    private final BoardService boardService;
    private final BoardColumnService boardColumnService;
    private final CardService cardService;
    private final TestObjectSupplier testObjectSupplier;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private UserRegisterRequest getRegisterRequest() {
        return this.testObjectSupplier.getRegisterRequest();
    }

    private UserLoginRequest getLoginRequest() {
        return this.testObjectSupplier.getLoginRequest();
    }

    //
    //    Helper methods for UserController
    //
    public String getRegisterRequestAsJson() {
        return toJson(this.getRegisterRequest());
    }

    public String getLoginRequestAsJson() {
        return toJson(this.getLoginRequest());
    }

    public void registerTestUser() {
        UserRegisterRequest request = this.testObjectSupplier.getRegisterRequest();

        userService.registerUser(request);
    }

    private AuthenticationResponse loginTestUser() {
        return userService.loginUser(this.getLoginRequest());
    }

    public String getTokenForAuthorizationHeader() {
        this.registerTestUser();
        AuthenticationResponse response = this.loginTestUser();
        return response.getToken();
    }

    public UUID getIdOfTestUser() {
        AppUser testUser = userService.getAppUserByEmail(this.testObjectSupplier.getTEST_EMAIL());
        return testUser.getId();
    }

    //
    //    Helper methods for BoardController
    //
    private BoardCreateRequest getBoardCreateRequest() {
        UUID testUserId = this.getIdOfTestUser();
        BoardCreateRequest request = this.testObjectSupplier.getBoardCreateRequest();
        request.setUserId(testUserId);

        return request;
    }

    public String getBoardCreateRequestAsJson() {
        return toJson(this.getBoardCreateRequest());
    }

    public Board createTestBoard() {
        return boardService.createBoard(this.getBoardCreateRequest());
    }

    //
    //    Helper methods for BoardColumnController
    //
    private BoardColumnCreateRequest getBoardColumnCreateRequest() {
        Board testBoard = this.createTestBoard();
        BoardColumnCreateRequest request = this.testObjectSupplier.getBoardColumnCreateRequest();
        request.setBoardId(testBoard.getId());

        return request;
    }

    public String getBoardColumnCreateRequestAsJson() {
        return toJson(this.getBoardColumnCreateRequest());
    }

    public BoardColumn createTestBoardColumn() {
        return boardColumnService.creatBoardColumn(this.getBoardColumnCreateRequest());
    }

    public String createTestBoardColumnAsJson() {
        return toJson(createTestBoardColumn());
    }

    //
    //    Helper methods for CardController
    //
    private CardCreateRequest getCardCreateRequest() {
        BoardColumn testBoardColumn = this.createTestBoardColumn();
        CardCreateRequest request = this.testObjectSupplier.getCardCreateRequest();
        request.setBoardColumnId(testBoardColumn.getId());

        return request;
    }

    public String getCardCreateRequestAsJson() {
        return toJson(this.getCardCreateRequest());
    }

    public Card createTestCard() {
        return cardService.registerCard(getCardCreateRequest());
    }

    public String getTestCardAsJson() {
        return toJson(createTestCard());
    }

    public CardBoardColumnUpdateRequest getCardColumnUpdateRequest() {
        BoardColumn testBoardColumn = this.createTestBoardColumn();
        Card testCard = this.createTestCard();

        return CardBoardColumnUpdateRequest.builder()
                .boardColumnId(testBoardColumn.getId())
                .card(testCard)
                .boardColumnId(testBoardColumn.getId())
                .build();
    }

    public String getCardColumnUpdateRequestAsJson() {
        return toJson(this.getCardColumnUpdateRequest());
    }

    private String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
