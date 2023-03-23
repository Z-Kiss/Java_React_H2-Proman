package com.zkiss.proman.modal.DTO.cardDTO;

import com.zkiss.proman.modal.Card;
import com.zkiss.proman.modal.DTO.Validator;
import lombok.Data;

@Data
public class CardsBoardColumnUpdateRequest implements Validator {

    private Long boardColumnId;
    private Card card;
}
