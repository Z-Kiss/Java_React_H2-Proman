package com.zkiss.proman.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@AutoConfigureMockMvc
class ForwardControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Test
    void forwardTaAbout() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                        .get("/about"))
                .andExpect(status().is2xxSuccessful())
                .andReturn();

        Assertions.assertEquals(result.getResponse().getForwardedUrl(), "/");
    }
}
