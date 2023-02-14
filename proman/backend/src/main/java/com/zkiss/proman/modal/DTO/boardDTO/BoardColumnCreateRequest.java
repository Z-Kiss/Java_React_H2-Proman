package com.zkiss.proman.modal.DTO.boardDTO;

import lombok.Data;

@Data
public class BoardColumnCreateRequest {

    private Long boardId;

    private String boardColumnTitle;

    private String boardColumnColor;
}
