package com.zkiss.proman.repository;

import com.zkiss.proman.model.*;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.mockito.Mockito.mock;

@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class RepositoryTest {

    @Autowired
    private BoardColumnRepository boardColumnRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    private final AppUser appUserTest = AppUser.builder()
            .email("test@test.com")
            .password("test")
            .name("test")
            .role(RoleType.USER)
            .build();


    @Test
    @Transactional
    public void test_AppUserRepository_save_working() {
        AppUser savedAppUser = userRepository.save(this.appUserTest);

        Assertions.assertNotNull(savedAppUser);
        Assertions.assertEquals(appUserTest.getName(),savedAppUser.getName());

    }

    @Test
    @Transactional
    public void test_BoardRepository_save_working(){
        BoardCreateRequest boardCreateRequestMock = mock(BoardCreateRequest.class);

        AppUser appUserMock = mock(AppUser.class);

        Board board = new Board(boardCreateRequestMock, appUserMock);

        Board savedBoard = boardRepository.save(board);

        Assertions.assertNotNull(savedBoard);
    }

    @Test
    @Transactional
    public void test_BoardColumnRepository_save_working(){
        BoardColumnCreateRequest requestMock = mock(BoardColumnCreateRequest.class);

        Board boardMock = mock(Board.class);

        BoardColumn boardColumn = new BoardColumn(requestMock, boardMock);

        BoardColumn savedBoardColumn = boardColumnRepository.save(boardColumn);

        Assertions.assertNotNull(savedBoardColumn);

    }

    @Test
    @Transactional
    public void test_CardRepository_save__working(){
        CardCreateRequest requestMock = mock(CardCreateRequest.class);

        BoardColumn boardColumnMock = mock(BoardColumn.class);

        Card card = new Card(requestMock, boardColumnMock);

        Card savedCard = cardRepository.save(card);

        Assertions.assertNotNull(savedCard);
    }


}