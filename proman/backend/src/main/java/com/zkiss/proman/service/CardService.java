package com.zkiss.proman.service;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardsBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CreateCardResponse;
import com.zkiss.proman.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {

    private final BoardColumnService boardColumnService;
    private final CardRepository cardRepository;


    public CreateCardResponse registerCard(CardCreateRequest createRequest) {
        BoardColumn boardColumn = boardColumnService.getBoardColumnById(createRequest.getBoardColumnId());
        Card card = new Card(createRequest, boardColumn);
        cardRepository.save(card);
        boardColumn.addCard(card);
        boardColumnService.update(boardColumn);
        return new CreateCardResponse(boardColumn.getId(), card);
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

    public void delete(Long id) {
        cardRepository.deleteById(id);
    }
}
