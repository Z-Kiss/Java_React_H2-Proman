package com.zkiss.proman.modal.DTO;

import lombok.Data;

@Data
public class UserLoginRequest implements Validator{

    private String email;

    private String password;

}
