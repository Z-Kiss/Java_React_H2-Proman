package com.zkiss.proman.controller;

import com.zkiss.proman.model.Card;
import com.zkiss.proman.utils.TestHelper;
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
class CardControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TestHelper testHelper;

    @Test
    @Transactional
    void test_createCard_method_is_working() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();

        mockMvc.perform(MockMvcRequestBuilders
                .post("/card")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(testHelper.getCardCreateRequestAsJson())
        ).andExpect(status().isCreated());
    }

    @Test
    @Transactional
    void test_updateCard_method_is_working() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();

        mockMvc.perform(MockMvcRequestBuilders
                .put("/card")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(testHelper.getTestCardAsJson())
        ).andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void test_updateCardsBoardColumn_method_is_working() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();

        mockMvc.perform(MockMvcRequestBuilders
                .put("/card/update-cards-board-columns")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(testHelper.getCardColumnUpdateRequestAsJson())
        ).andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    void test_deleteCard_method_is_working() throws Exception {
        String token = testHelper.getTokenForAuthorizationHeader();
        Card testCard = testHelper.createTestCard();

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/card/" + testCard.getId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
        ).andExpect(status().is2xxSuccessful());
    }
}
