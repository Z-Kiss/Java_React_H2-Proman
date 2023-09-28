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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class TestHelper {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private BoardService boardService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final UserRegisterRequest registerRequest = UserRegisterRequest.builder()
            .email("test@test.com")
            .password("testPassword")
            .name("testName")
            .role(RoleType.USER)
            .build();

    public final UserLoginRequest loginRequest = UserLoginRequest.builder()
            .email("test@test.com")
            .password("testPassword")
            .build();


    public String getRegisterRequest() throws JsonProcessingException {
        return toJson(registerRequest);
    }

    public String getLoginRequest() throws JsonProcessingException {
        return toJson(loginRequest);
    }

    public String getBoardCreateRequest() throws JsonProcessingException {
        UUID testUserId = this.getIdOfTestUser();

        BoardCreateRequest boardCreateRequest = BoardCreateRequest.builder()
                .userId(testUserId)
                .title("testTitle")
                .textColor("testColor")
                .bgColor("testColor")
                .build();

        return toJson(boardCreateRequest);
    }

    public String getTokenForAuthorizationHeader(){
        this.registerTestUser();
        AuthenticationResponse response = this.loginTestUser();
        return response.getToken();
    }

    public void registerTestUser() {
        AppUser testUser = AppUser.builder()
                .password(this.passwordEncoder.encode(registerRequest.getPassword()))
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .role(registerRequest.getRole())
                .build();

        userRepository.save(testUser);
    }

    private AuthenticationResponse loginTestUser() {
        return userService.loginUser(loginRequest);
    }

    public UUID getIdOfTestUser() {
        AppUser testUser = userService.getAppUserByEmail("test@test.com");
        return testUser.getId();
    }


    public Board createTestBoard(){
        UUID testUserId = getIdOfTestUser();

        BoardCreateRequest boardCreateRequest = BoardCreateRequest.builder()
                .userId(testUserId)
                .title("testTitle")
                .textColor("testColor")
                .bgColor("testColor")
                .build();

        return boardService.createBoard(boardCreateRequest);
    }

    private String toJson(Object obj) throws JsonProcessingException {
        return objectMapper.writeValueAsString(obj);
    }
}
