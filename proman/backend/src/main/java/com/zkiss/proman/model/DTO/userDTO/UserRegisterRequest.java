package com.zkiss.proman.model.DTO.userDTO;

import com.zkiss.proman.model.RoleType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRegisterRequest{
    @NotNull(message = "should be present")
    private String name;
    @NotNull(message = "should be present")
    private String email;
    @NotNull(message = "should be present")
    private String password;
    @NotNull(message = "should be present")
    private RoleType role;
}
