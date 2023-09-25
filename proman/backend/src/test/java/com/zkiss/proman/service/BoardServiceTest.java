package com.zkiss.proman.service;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.BoardRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoardServiceTest {
    @Mock
    private BoardRepository boardRepository;
    @Mock
    private UserService userService;
    @InjectMocks
    private BoardService boardService;

    private final AppUser appUserTest = AppUser.builder()
            .id(UUID.randomUUID())
            .email("test@test.com")
            .password("test")
            .name("test")
            .role(RoleType.USER)
            .build();


    @Test
    void test_createBoard_method_working() {
        BoardCreateRequest request = BoardCreateRequest.builder()
                .userId(appUserTest.getId())
                .bgColor("testBgColor")
                .textColor("testTestColor")
                .title("test")
                .build();

        when(boardRepository.save(any(Board.class))).thenReturn(new Board());

        Board boardFromService = boardService.createBoard(request);

        verify(userService,times(1)).getAppUserById(any(UUID.class));
        Assertions.assertNotNull(boardFromService);

    }

    @Test
    void test_getAllBoardsByUserId_method_working() {
        when(boardRepository.getBoardsByAppUser_Id(any(UUID.class))).thenReturn(List.of(mock(Board.class)));

        List<Board> boardsFromService = boardService.getAllBoardsByUserId(appUserTest.getId());

        verify(boardRepository,times(1)).getBoardsByAppUser_Id(any(UUID.class));
        Assertions.assertNotNull(boardsFromService);
    }

    @Test
    void test_getAllBoards_method_working() {
        when(boardRepository.findAll()).thenReturn(List.of(mock(Board.class)));

        List<Board> boardsFromService = boardRepository.findAll();

        verify(boardRepository,times(1)).findAll();
        Assertions.assertNotNull(boardsFromService);
    }


    @Test
    void test_getBoardById_method_working() {
        when(boardRepository.findById(any())).thenReturn(Optional.of(mock(Board.class)));

        Board boardFromService = boardService.getBoardById(1L);

        Assertions.assertNotNull(boardFromService);
    }

    @Test
    void test_deleteBoard_method_working() {
        when(boardRepository.deleteBoardById(any(Long.class))).thenReturn(1);

        int deletedRecords = boardService.deleteBoard(1L);

        verify(boardRepository,times(1)).deleteBoardById(any(Long.class));
        Assertions.assertEquals(deletedRecords,1);
    }
}