package com.zkiss.proman.controller;

import com.zkiss.proman.model.Board;
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

import java.util.UUID;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@AutoConfigureMockMvc
class BoardControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TestHelper testHelper;

    @Test
    @Transactional
    void getAllBoards() throws Exception {

        String token = testHelper.getTokenForAuthorizationHeader();

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/board")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void getAllBoardsByUser() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();
        UUID testUserId = testHelper.getIdOfTestUser();

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/board/" + testUserId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void createBoard() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/board")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testHelper.getBoardCreateRequest())
                ).andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void deleteBoard() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();
        Board testBoard = testHelper.createTestBoard();

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/board/" + testBoard.getId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
        ).andExpect(status().is2xxSuccessful());

    }





}