package com.zkiss.proman.model.DTO.userDTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserLoginRequest{
    @NotNull(message = "Email should be present")
    private String email;
    @NotNull(message = "Password should be present")
    private String password;

}
