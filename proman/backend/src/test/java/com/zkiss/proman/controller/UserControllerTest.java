package com.zkiss.proman.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.UserRepository;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MockMvc mockMvc;

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
    void registerUser() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(this.registerRequest))
        ).andExpect(status().isCreated());
    }

    @Test
    @Transactional
    void loginUser() throws Exception {
        registerTestUser();

        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(loginRequest))
        ).andExpect(status().is2xxSuccessful());
    }


    @Test
    @Transactional
    void checkOnMe() throws Exception {
        registerTestUser();
        AuthenticationResponse response = loginTestUser();
        String token = response.getToken();

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/user/me")
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

    private AuthenticationResponse loginTestUser() {
        return userService.loginUser(loginRequest);
    }

    private String toJson(Object obj) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(obj);
    }
}
