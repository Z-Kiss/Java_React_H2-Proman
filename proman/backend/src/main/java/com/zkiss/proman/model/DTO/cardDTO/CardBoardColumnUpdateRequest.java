package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@NotNull
public class CardBoardColumnUpdateRequest {
    @NotNull(message = "BoardColumnId should be present")
    private Long boardColumnId;
    @NotNull(message = "Card should be present")
    private Card card;
}
