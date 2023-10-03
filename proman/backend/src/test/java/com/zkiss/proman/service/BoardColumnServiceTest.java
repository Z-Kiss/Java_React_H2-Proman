package com.zkiss.proman.service;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.repository.BoardColumnRepository;
import com.zkiss.proman.utils.TestObjectSupplier;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoardColumnServiceTest {

    @Mock
    private BoardService boardService;
    @Mock
    private BoardColumnRepository boardColumnRepository;
    @InjectMocks
    private BoardColumnService boardColumnService;
    private final TestObjectSupplier testObjectSupplier = new TestObjectSupplier();

    @Test
    void test_creatBoardColumn_method_working() {
        Board board = mock(Board.class);
        when(boardService.getBoardById(any())).thenReturn(board);
        when(boardColumnRepository.save(any())).thenReturn(mock(BoardColumn.class));
        BoardColumnCreateRequest request = testObjectSupplier.getBoardColumnCreateRequest();
        request.setBoardId(1L);

        BoardColumn boardColumnFromService = boardColumnService.creatBoardColumn(request);

        verify(boardService, times(1)).getBoardById(any());
        verify(boardColumnRepository, times(1)).save(any());
        Assertions.assertNotNull(boardColumnFromService);
    }

    @Test
    void test_creatBoardColumn_method_throw_entity_not_found_exception_when_board_not_present() {
        when(boardService.getBoardById(any())).thenThrow(new EntityNotFoundException("There is no Board with id " + 1L));
        BoardColumnCreateRequest request = testObjectSupplier.getBoardColumnCreateRequest();
        request.setBoardId(1L);

        Exception e = Assertions.assertThrows(EntityNotFoundException.class, () -> boardColumnService.creatBoardColumn(request));

        verify(boardService, times(1)).getBoardById(any());
        verify(boardColumnRepository, times(0)).save(any());
        Assertions.assertEquals(e.getMessage(), "There is no Board with id " + 1L);
    }

    @Test
    void test_update_method_working() {
        BoardColumn mockedBoardColumn = mock(BoardColumn.class);
        when(boardColumnRepository.findById(any(Long.class))).thenReturn(Optional.of(mockedBoardColumn));

        Assertions.assertDoesNotThrow(() -> boardColumnService.updateBoardColumn(mockedBoardColumn));

        verify(boardColumnRepository, times(1)).findById(any());
        verify(boardColumnRepository, times(1)).save(any());
    }

    @Test
    void test_update_method_throw_entity_not_found_exception_when_board_column_not_present() {
        BoardColumn boardColumnMock = mock(BoardColumn.class);
        when(boardColumnMock.getId()).thenReturn(1L);
        when(boardColumnRepository.findById(any(Long.class))).thenThrow(new EntityNotFoundException("There is no BoardColumn with id" + 1L));

        Exception e = Assertions.assertThrows(EntityNotFoundException.class, () -> boardColumnService.updateBoardColumn(boardColumnMock));

        verify(boardColumnRepository, times(1)).findById(any());
        verify(boardColumnRepository, times(0)).save(any());
        Assertions.assertEquals(e.getMessage(), "There is no BoardColumn with id" + 1L);
    }

    @Test
    void test_deleteBoardColumn_method_working() {
        when(boardColumnRepository.deleteBoardColumnById(any(Long.class))).thenReturn(1);

        int deletedRecords = boardColumnService.deleteBoardColumn(1L);

        verify(boardColumnRepository, times(1)).deleteBoardColumnById(any(Long.class));
        Assertions.assertEquals(deletedRecords, 1);
    }

    @Test
    void test_getBoardColumnById_method_working() {
        when(boardColumnRepository.findById(any(Long.class))).thenReturn(Optional.of(mock(BoardColumn.class)));

        BoardColumn boardColumnFromService = boardColumnService.getBoardColumnById(1L);

        verify(boardColumnRepository, times(1)).findById(any(Long.class));
        Assertions.assertNotNull(boardColumnFromService);
    }

    @Test
    void test_getBoardColumnById_method_throw_entity_not_found_exception_when_board_column_not_present() {
        when(boardColumnRepository.findById(any(Long.class))).thenThrow(new EntityNotFoundException("There is no BoardColumn with id" + 1L));

        Exception e = Assertions.assertThrows(EntityNotFoundException.class,()-> boardColumnService.getBoardColumnById(1L));

        verify(boardColumnRepository, times(1)).findById(any(Long.class));
        Assertions.assertEquals(e.getMessage(),"There is no BoardColumn with id" + 1L);
    }
}