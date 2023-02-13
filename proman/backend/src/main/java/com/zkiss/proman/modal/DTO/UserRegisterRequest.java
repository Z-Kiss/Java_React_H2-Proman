package com.zkiss.proman.modal.DTO;

import com.zkiss.proman.modal.RoleType;
import lombok.Data;

@Data
public class UserRegisterRequest {

    private String name;

    private String email;

    private String password;

    private RoleType role;

    public boolean hasAllInformation(){
        return this.name != null && this.email != null && this.password != null && this.role != null;
    }

}
