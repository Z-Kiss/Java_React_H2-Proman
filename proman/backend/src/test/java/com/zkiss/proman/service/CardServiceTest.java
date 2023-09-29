package com.zkiss.proman.service;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateResponse;
import com.zkiss.proman.repository.CardRepository;
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
class CardServiceTest {
    @Mock
    private BoardColumnService boardColumnService;
    @Mock
    private CardRepository cardRepository;

    @InjectMocks
    private CardService cardService;

    @Test
    void test_registerCard_method_working() {
        BoardColumn mockBoardColumn = mock(BoardColumn.class);
        when(mockBoardColumn.getId()).thenReturn(1L);

        CardCreateRequest request = CardCreateRequest.builder()
                .boardColumnId(1L)
                .title("test")
                .textColor("testColor")
                .bgColor("test")
                .build();

        when(boardColumnService.getBoardColumnById(any())).thenReturn(mockBoardColumn);
        when(cardRepository.save(any())).thenReturn(mock(Card.class));

        Card cardFromService = cardService.registerCard(request);

        verify(boardColumnService, times(1)).getBoardColumnById(any());
        verify(cardRepository, times(1)).save(any());
        Assertions.assertNotNull(cardFromService);
    }

    @Test
    void test_updateCard_method_working() {
        when(cardRepository.findById(any(Long.class))).thenReturn(Optional.of(mock(Card.class)));

        Assertions.assertDoesNotThrow(() -> cardService.updateCard(mock(Card.class)));
        verify(cardRepository, times(1)).findById(any(Long.class));
    }

    @Test
    void test_updateCardsBoardColumn_method_working() {
        CardBoardColumnUpdateRequest request = CardBoardColumnUpdateRequest.builder()
                .boardColumnId(1L)
                .card(mock(Card.class))
                .build();

        when(boardColumnService.getBoardColumnById(any())).thenReturn(mock(BoardColumn.class));
        when(cardRepository.findById(any(Long.class))).thenReturn(Optional.of(mock(Card.class)));

        Assertions.assertDoesNotThrow(() -> cardService.updateCardsBoardColumn(request));
        verify(boardColumnService,times(1)).getBoardColumnById(any());
        verify(cardRepository,times(1)).findById(any(Long.class));
    }


    @Test
    void test_delete_method_working() {
        when(cardRepository.deleteCardById(any(Long.class))).thenReturn(1);

        int deletedRecords = cardService.deleteCard(1L);

        verify(cardRepository, times(1)).deleteCardById(any(Long.class));
        Assertions.assertEquals(deletedRecords, 1);
    }
}