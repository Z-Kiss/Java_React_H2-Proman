package com.zkiss.proman.modal.DTO.userDTO;

import com.zkiss.proman.modal.DTO.Validator;
import com.zkiss.proman.modal.RoleType;
import lombok.Data;

@Data
public class UserRegisterRequest implements Validator {

    private String name;

    private String email;

    private String password;

    private RoleType role;

}
