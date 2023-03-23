package com.zkiss.proman.modal.DTO.cardDTO;

import com.zkiss.proman.modal.DTO.Validator;
import lombok.Data;

@Data
public class CardCreateRequest implements Validator {
    private Long id;

    private String title;

    private String bgColor;

    private String textColor;

    private String cardDescription;
}