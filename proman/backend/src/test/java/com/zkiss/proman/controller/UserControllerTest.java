package com.zkiss.proman.controller;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TestHelper testHelper;

    @Test
    @Transactional
    void test_registerUser_method_working() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testHelper.getRegisterRequest())
        ).andExpect(status().isCreated());
    }

    @Test
    @Transactional
    void test_loginUser_method_working() throws Exception {
        testHelper.registerTestUser();

        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testHelper.getLoginRequest())
        ).andExpect(status().is2xxSuccessful());
    }


    @Test
    @Transactional
    void test_checkOnMe_method_working() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();

        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/user/me")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
        ).andExpect(status().is2xxSuccessful());

    }


}
