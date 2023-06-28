package com.zkiss.proman.model.DTO.boardDTO;

import com.zkiss.proman.model.DTO.Validator;
import lombok.Data;

import java.util.UUID;

@Data
public class BoardCreateRequest implements Validator {

    private UUID userId;

    private String title;

    private String bgColor;

    private String textColor;

}
