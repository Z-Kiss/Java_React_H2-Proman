package com.zkiss.proman.model.DTO.boardcolumnDTO;

import com.zkiss.proman.model.DTO.Validator;
import lombok.Data;

@Data
public class BoardColumnCreateRequest implements Validator {

    private Long id;


    private String title;

    private String bgColor;

    private String textColor;

}
