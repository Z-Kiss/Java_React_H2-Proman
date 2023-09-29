package com.zkiss.proman.service;

import com.zkiss.proman.model.Board;
import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateResponse;
import com.zkiss.proman.repository.BoardColumnRepository;
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

    @Test
    void test_creatBoardColumn_method_working() {
        Board board = mock(Board.class);

        when(boardService.getBoardById(any())).thenReturn(board);
        when(boardColumnRepository.save(any())).thenReturn(mock(BoardColumn.class));

        BoardColumnCreateRequest request = BoardColumnCreateRequest.builder()
                .boardId(1L)
                .title("test")
                .bgColor("testBgColor")
                .textColor("testColor")
                .build();

        BoardColumn boardColumnFromService = boardColumnService.creatBoardColumn(request);

        verify(boardService,times(1)).getBoardById(any());
        verify(boardColumnRepository, times(1)).save(any());
        Assertions.assertNotNull(boardColumnFromService);
    }

    @Test
    void test_update_method_working() {
        BoardColumn mockedBoardColumn = mock(BoardColumn.class);

        when(boardColumnRepository.findById(any(Long.class))).thenReturn(Optional.of(mockedBoardColumn));

        Assertions.assertDoesNotThrow(()->boardColumnService.updateBoardColumn(mockedBoardColumn));
        verify(boardColumnRepository,times(1)).findById(any());
        verify(boardColumnRepository,times(1)).save(any());
    }

    @Test
    void test_deleteBoardColumn_method_working() {
        when(boardColumnRepository.deleteBoardColumnById(any(Long.class))).thenReturn(1);

        int deletedRecords = boardColumnRepository.deleteBoardColumnById(1L);

        verify(boardColumnRepository,times(1)).deleteBoardColumnById(any(Long.class));
        Assertions.assertEquals(deletedRecords, 1);
    }

    @Test
    void test_getBoardColumnById_method_working() {
        when(boardColumnRepository.findById(any(Long.class))).thenReturn(Optional.of(mock(BoardColumn.class)));

        BoardColumn boardColumnFromService = boardColumnService.getBoardColumnById(1L);

        verify(boardColumnRepository, times(1)).findById(any(Long.class));
        Assertions.assertNotNull(boardColumnFromService);
    }
}