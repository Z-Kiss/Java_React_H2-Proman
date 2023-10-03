package com.zkiss.proman.service;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.repository.BoardRepository;
import com.zkiss.proman.utils.TestObjectSupplier;
import jakarta.persistence.EntityNotFoundException;
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

    private final TestObjectSupplier testObjectSupplier = new TestObjectSupplier();

    @Test
    void test_createBoard_method_working() {
        AppUser appUserTest = this.testObjectSupplier.getGuestAppUserTest();
        BoardCreateRequest request = this.testObjectSupplier.getBoardCreateRequest();
        request.setUserId(appUserTest.getId());
        when(boardRepository.save(any(Board.class))).thenReturn(new Board());

        Board boardFromService = boardService.createBoard(request);

        verify(userService, times(1)).getAppUserById(any(UUID.class));
        Assertions.assertNotNull(boardFromService);
    }

    @Test
    void test_createBoard_method_throw_entity_not_found_exception_when_user_not_present() {
        AppUser appUserTest = this.testObjectSupplier.getGuestAppUserTest();
        BoardCreateRequest request = this.testObjectSupplier.getBoardCreateRequest();
        request.setUserId(appUserTest.getId());
        when(userService.getAppUserById(any(UUID.class))).thenThrow(new EntityNotFoundException("No user with Id:" + appUserTest.getId()));

        Exception e = Assertions.assertThrows(EntityNotFoundException.class, ()->boardService.createBoard(request));

        verify(userService, times(1)).getAppUserById(any(UUID.class));
        verify(boardRepository, times(0)).save(any());
        Assertions.assertEquals(e.getMessage(),"No user with Id:" + appUserTest.getId());
    }

    @Test
    void test_getAllBoardsByUserId_method_working() {
        AppUser appUserTest = this.testObjectSupplier.getAppUserTest();
        when(boardRepository.getBoardsByAppUser_Id(any(UUID.class))).thenReturn(List.of(mock(Board.class)));

        List<Board> boardsFromService = boardService.getAllBoardsByUserId(appUserTest.getId());

        verify(boardRepository, times(1)).getBoardsByAppUser_Id(any(UUID.class));
        Assertions.assertNotNull(boardsFromService);
    }

    @Test
    void test_getBoardById_method_working() {
        when(boardRepository.findById(any())).thenReturn(Optional.of(mock(Board.class)));

        Board boardFromService = boardService.getBoardById(1L);

        Assertions.assertNotNull(boardFromService);
    }

    @Test
    void test_getBoardById_method_throw_entity_not_found_exception_when_board_not_present() {
        when(boardRepository.findById(any())).thenThrow(new EntityNotFoundException("There is no Board with id "+ 1L));

        Exception e = Assertions.assertThrows(EntityNotFoundException.class,()->boardService.getBoardById(1L));
        verify(boardRepository,times(1)).findById(any(Long.class));
        Assertions.assertEquals(e.getMessage(),"There is no Board with id "+ 1L);
    }

    @Test
    void test_deleteBoard_method_working() {
        when(boardRepository.deleteBoardById(any(Long.class))).thenReturn(1);

        int deletedRecords = boardService.deleteBoard(1L);

        verify(boardRepository, times(1)).deleteBoardById(any(Long.class));
        Assertions.assertEquals(deletedRecords, 1);
    }
}