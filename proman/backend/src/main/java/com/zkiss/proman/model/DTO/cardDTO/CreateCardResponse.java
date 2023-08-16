package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateCardResponse {
    @NotNull(message = "should be present")
    private Long boardColumnId;
    @NotNull(message = "should be present")
    private Card card;
}
