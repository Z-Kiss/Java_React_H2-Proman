package com.zkiss.proman.model.DTO.userDTO;

import com.zkiss.proman.model.DTO.Validator;
import lombok.Data;

@Data
public class UserLoginRequest implements Validator {

    private String email;

    private String password;

}
