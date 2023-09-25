package com.zkiss.proman.model.DTO.boardDTO;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class BoardCreateRequest {

    @NotNull(message = "User Id should be present")
    private UUID userId;

    @NotNull(message = "Title should be present")
    private String title;

    @NotNull(message = "BgColor should be present")
    private String bgColor;

    @NotNull(message = "TextColor should be present")
    private String textColor;

}
