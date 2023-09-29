package com.zkiss.proman.model.DTO.userDTO;

import com.zkiss.proman.model.RoleType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRegisterRequest{
    @NotNull(message = "Name should be present")
    private String name;
    @NotNull(message = "Email should be present")
    private String email;
    @NotNull(message = "Password should be present")
    private String password;
    @NotNull(message = "Role should be present")
    private RoleType role;
}
