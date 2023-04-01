package com.zkiss.proman.model.DTO.cardDTO;

import com.zkiss.proman.model.DTO.Validator;
import lombok.Data;

@Data
public class CardCreateRequest implements Validator {
    private Long id;

    private String title;

    private String bgColor;

    private String textColor;

    private String cardDescription;
}
