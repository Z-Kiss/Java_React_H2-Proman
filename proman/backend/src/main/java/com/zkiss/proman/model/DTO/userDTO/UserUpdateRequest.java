package com.zkiss.proman.model.DTO.userDTO;

import com.zkiss.proman.model.RoleType;
import lombok.Data;

@Data
public class UserUpdateRequest{

    private Long userId;

    private String name;

    private String email;

    private String password;

    private RoleType role;

}
