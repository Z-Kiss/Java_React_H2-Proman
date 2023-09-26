package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.Card;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardBoardColumnUpdateRequest {
    @NotNull(message = "BoardColumnId should be present")
    private Long boardColumnId;
    @NotNull(message = "Card should be present")
    private Card card;
}
