package com.zkiss.proman.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.UserRepository;
import com.zkiss.proman.service.BoardService;
import com.zkiss.proman.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@AutoConfigureMockMvc
class BoardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BoardService boardService;


    private final UserRegisterRequest registerRequest = UserRegisterRequest.builder()
            .email("test@test.com")
            .password("testPassword")
            .name("testName")
            .role(RoleType.USER)
            .build();

    private final UserLoginRequest loginRequest = UserLoginRequest.builder()
            .email("test@test.com")
            .password("testPassword")
            .build();


    @Test
    @Transactional
    void getAllBoards() throws Exception {
        this.registerTestUser();
        String token = this.loginTestUser().getToken();

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/board")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void getAllBoardsByUser() throws Exception {
        this.registerTestUser();
        String token = this.loginTestUser().getToken();
        UUID testUserId = getIdOfTestUser();

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/board/" + testUserId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void createBoard() throws Exception {
        this.registerTestUser();
        String token = this.loginTestUser().getToken();
        UUID testUserId = getIdOfTestUser();

        BoardCreateRequest boardCreateRequest = BoardCreateRequest.builder()
                .userId(testUserId)
                .title("testTitle")
                .textColor("testColor")
                .bgColor("testColor")
                .build();

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/board")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(boardCreateRequest))
                ).andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void deleteBoard() throws Exception {
        this.registerTestUser();
        String token = this.loginTestUser().getToken();
        UUID testUserId = getIdOfTestUser();
        Board testBoard = this.createTestBoard(testUserId);

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/board/" + testBoard.getId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
        ).andExpect(status().is2xxSuccessful());

    }

    private void registerTestUser() {
        AppUser testUser = AppUser.builder()
                .password(this.passwordEncoder.encode(registerRequest.getPassword()))
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .role(registerRequest.getRole())
                .build();

        userRepository.save(testUser);
    }

    private UUID getIdOfTestUser() {
        AppUser testUser = userService.getAppUserByEmail("test@test.com");
        return testUser.getId();
    }

    private AuthenticationResponse loginTestUser() {
        return userService.loginUser(loginRequest);
    }

    private Board createTestBoard(UUID testUserId){
        BoardCreateRequest boardCreateRequest = BoardCreateRequest.builder()
                .userId(testUserId)
                .title("testTitle")
                .textColor("testColor")
                .bgColor("testColor")
                .build();

        return boardService.createBoard(boardCreateRequest);

    }

    private String toJson(Object obj) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(obj);
    }
}