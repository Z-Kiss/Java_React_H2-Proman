package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateCardResponse {

    String componentType;

    Long boardColumnId;

    Card card;
}
