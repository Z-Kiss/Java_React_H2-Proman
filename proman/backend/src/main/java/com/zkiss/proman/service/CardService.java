package com.zkiss.proman.service;

import com.zkiss.proman.model.BoardColumn;
import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateResponse;
import com.zkiss.proman.repository.CardRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {

    private final BoardColumnService boardColumnService;
    private final CardRepository cardRepository;

    @Transactional
    public Card registerCard(CardCreateRequest createRequest) {
        BoardColumn boardColumn = boardColumnService.getBoardColumnById(createRequest.getBoardColumnId());
        Card savedCard = cardRepository.save( new Card(createRequest, boardColumn));
        this.updateBoardColumn(boardColumn, savedCard);
        return savedCard;
    }

    private void updateBoardColumn(BoardColumn boardColumnToUpdate, Card card){
        boardColumnToUpdate.addCard(card);
        boardColumnService.updateBoardColumn(boardColumnToUpdate);
    }
    @Transactional
    public void updateCard(Card updatedCard) {
        Card card = cardRepository.findById(updatedCard.getId()).orElseThrow(()-> new EntityNotFoundException("There is no Card with id: "+ updatedCard.getId()));
        card.update(updatedCard);
        cardRepository.save(card);
    }
    @Transactional
    public void updateCardsBoardColumn(CardBoardColumnUpdateRequest updateRequest){
        BoardColumn boardColumn = boardColumnService.getBoardColumnById(updateRequest.getBoardColumnId());
        Card updatedCard = updateRequest.getCard();
        updatedCard.setBoardColumn(boardColumn);
        Card card = cardRepository.findById(updatedCard.getId()).orElseThrow(()-> new EntityNotFoundException("There is no Card with id: "+ updatedCard.getId()));
        card.update(updatedCard);
        cardRepository.save(card);
    }
    @Transactional
    public Integer deleteCard(Long id) {
       return cardRepository.deleteCardById(id);
    }
}
