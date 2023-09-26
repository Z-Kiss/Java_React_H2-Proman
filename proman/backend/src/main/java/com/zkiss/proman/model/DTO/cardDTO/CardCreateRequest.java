package com.zkiss.proman.model.DTO.cardDTO;


import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardCreateRequest {
    @NotNull(message = "BoardColumnId should be present")
    private Long boardColumnId;
    @NotNull(message = "Title should be present")
    private String title;
    @NotNull(message = "BgColor should be present")
    private String bgColor;
    @NotNull(message = "TextColor should be present")
    private String textColor;

    private String cardDescription;
}
