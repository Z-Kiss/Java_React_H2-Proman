package com.zkiss.proman.model.DTO.boardDTO;

import com.zkiss.proman.model.DTO.Validator;
import lombok.Data;

@Data
public class BoardCreateRequest implements Validator {

    private String title;

    private String bgColor;

    private String textColor;

}
