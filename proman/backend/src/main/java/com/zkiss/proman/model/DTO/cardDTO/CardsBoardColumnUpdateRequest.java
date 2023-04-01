package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.Validator;
import lombok.Data;

@Data
public class CardsBoardColumnUpdateRequest implements Validator {

    private Long boardColumnId;
    private Card card;
}
