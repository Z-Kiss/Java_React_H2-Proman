package com.zkiss.proman.modal.DTO.boardDTO;

import com.zkiss.proman.modal.DTO.Validator;
import lombok.Data;

@Data
public class BoardCreateRequest implements Validator {

    private String name;

    private String color;

    private String textColor;
}
