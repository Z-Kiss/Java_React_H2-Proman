package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardCreateResponse {

    private Long boardColumnId;

    private Card card;
}
