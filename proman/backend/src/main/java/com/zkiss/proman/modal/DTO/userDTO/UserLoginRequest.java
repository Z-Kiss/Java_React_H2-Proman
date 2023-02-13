package com.zkiss.proman.modal.DTO.userDTO;

import com.zkiss.proman.modal.DTO.Validator;
import lombok.Data;

@Data
public class UserLoginRequest implements Validator {

    private String email;

    private String password;

}
