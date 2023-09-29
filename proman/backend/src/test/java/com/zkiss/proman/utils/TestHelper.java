package com.zkiss.proman.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.*;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.repository.UserRepository;
import com.zkiss.proman.service.BoardColumnService;
import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.CardService;
import com.zkiss.proman.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TestHelper {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final BoardService boardService;
    private final BoardColumnService boardColumnService;
    private final CardService cardService;

    private final String TEST_EMAIL = "test@test.com";
    private final String TEST_PASSWORD = "testPassword";
    private final String TEST_NAME = "testName";
    private final String TEST_TITLE = "testTitle";
    private final String TEST_TEXT_COLOR = "testTextColor";
    private final String TEST_BG_COLOR = "testBgColor";
    private final RoleType TEST_ROLE = RoleType.USER;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final UserRegisterRequest registerRequest = UserRegisterRequest.builder()
            .email(TEST_EMAIL)
            .password(TEST_PASSWORD)
            .name(TEST_NAME)
            .role(TEST_ROLE)
            .build();
    private final UserLoginRequest loginRequest = UserLoginRequest.builder()
            .email(TEST_EMAIL)
            .password(TEST_PASSWORD)
            .build();

    //
    //    Helper methods for UserController
    //
    public String getRegisterRequestAsJson() {
        return toJson(registerRequest);
    }

    public String getLoginRequestAsJson() {
        return toJson(loginRequest);
    }

    public void registerTestUser() {
        AppUser testUser = AppUser.builder()
                .password(this.passwordEncoder.encode(TEST_PASSWORD))
                .name(TEST_NAME)
                .email(TEST_EMAIL)
                .role(TEST_ROLE)
                .build();

        userRepository.save(testUser);
    }

    private AuthenticationResponse loginTestUser() {
        return userService.loginUser(loginRequest);
    }

    public String getTokenForAuthorizationHeader() {
        this.registerTestUser();
        AuthenticationResponse response = this.loginTestUser();
        return response.getToken();
    }

    public UUID getIdOfTestUser() {
        AppUser testUser = userService.getAppUserByEmail(TEST_EMAIL);
        return testUser.getId();
    }

    //
    //    Helper methods for BoardController
    //
    private BoardCreateRequest getBoardCreateRequest() {
        UUID testUserId = this.getIdOfTestUser();
        return BoardCreateRequest.builder()
                .userId(testUserId)
                .title(TEST_TITLE)
                .textColor(TEST_TEXT_COLOR)
                .bgColor(TEST_BG_COLOR)
                .build();
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

        return BoardColumnCreateRequest.builder()
                .boardId(testBoard.getId())
                .textColor(TEST_TEXT_COLOR)
                .bgColor(TEST_BG_COLOR)
                .title(TEST_TITLE)
                .build();
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

        return CardCreateRequest.builder()
                .boardColumnId(testBoardColumn.getId())
                .title(TEST_TITLE)
                .textColor(TEST_TEXT_COLOR)
                .bgColor(TEST_BG_COLOR)
                .build();
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
