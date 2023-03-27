package com.zkiss.proman.service;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardsBoardColumnUpdateRequest;
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
        BoardColumn boardColumn = boardColumnService.getBoardColumnById(createRequest.getId());
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

    public void update(CardsBoardColumnUpdateRequest updateRequest){

        BoardColumn boardColumn = boardColumnService.getBoardColumnById(updateRequest.getBoardColumnId());
        Card updatedCard = updateRequest.getCard();
        updatedCard.setBoardColumn(boardColumn);
        Card card = cardRepository.getCardById(updatedCard.getId());
        card.update(updatedCard);
        cardRepository.save(card);
    }



    public void delete(Long cardId) {
        cardRepository.deleteById(cardId);
    }
}
