package com.zkiss.proman.model.DTO.boardcolumnDTO;


import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data

public class BoardColumnCreateRequest {

    @NotNull(message = "BoardId should be present")
    private Long boardId;
    @NotNull(message = "Title should be present")
    private String title;
    @NotNull(message = " BgColor should be present")
    private String bgColor;
    @NotNull(message = " TextColor should be present")
    private String textColor;
}
