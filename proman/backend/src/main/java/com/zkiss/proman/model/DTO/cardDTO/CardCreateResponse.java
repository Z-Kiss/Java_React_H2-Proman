package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardCreateResponse {

    private Long boardColumnId;


    private Card card;

    public CardCreateResponse(Card card) {
        this.boardColumnId = card.getBoardColumnId();
        this.card = card;
    }
}
