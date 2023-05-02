package com.zkiss.proman.model.DTO.userDTO;

import com.zkiss.proman.model.DTO.Validator;
import com.zkiss.proman.model.RoleType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRegisterRequest implements Validator {

    private String name;

    private String email;

    private String password;

    private RoleType role;

}
