package com.zkiss.proman.model.DTO.userDTO;

import com.zkiss.proman.model.AppUser;
import lombok.Data;

import java.util.UUID;

@Data
public class UserInfo {

    private String userName;
    private UUID userId;

    public UserInfo (AppUser appUser){
        this.userName = appUser.getName();
        this.userId = appUser.getId();
    }
}
