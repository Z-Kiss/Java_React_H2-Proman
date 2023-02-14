package com.zkiss.proman.service;

import com.zkiss.proman.modal.BoardColumn;
import com.zkiss.proman.modal.Card;
import com.zkiss.proman.modal.DTO.boardDTO.CardCreateRequest;
import com.zkiss.proman.repository.CardRepository;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private BoardColumnService boardColumnService;
    private CardRepository cardRepository;

    public CardService(BoardColumnService boardColumnService, CardRepository cardRepository) {
        this.boardColumnService = boardColumnService;
        this.cardRepository = cardRepository;
    }

    public void registerCard(CardCreateRequest createRequest) {
        BoardColumn boardColumn = boardColumnService.getBoardColumnById(createRequest.getBoardColumnId());
        Card card = new Card(createRequest, boardColumn);
        cardRepository.save(card);
        boardColumn.addCard(card);
        boardColumnService.update(boardColumn);
    }

    public void update(Card updatedCard) {
        Card card = cardRepository.getCardById(updatedCard.getId());
        card.update(updatedCard);
        cardRepository.save(card);
    }
}
