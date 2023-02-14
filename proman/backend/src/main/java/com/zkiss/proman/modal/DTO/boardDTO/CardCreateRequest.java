package com.zkiss.proman.modal.DTO.boardDTO;

import com.zkiss.proman.modal.DTO.Validator;
import lombok.Data;

@Data
public class CardCreateRequest implements Validator {
    private Long boardColumnId;

    private String cardTitle;

    private String cardColor;

    private String cardDescription;
}
