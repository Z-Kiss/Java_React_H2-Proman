package com.zkiss.proman.modal.DTO.userDTO;

import com.zkiss.proman.modal.Board;
import com.zkiss.proman.modal.DTO.Validator;
import com.zkiss.proman.modal.RoleType;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import java.util.Set;
@Data
public class UserUpdateRequest{

    private Long userId;
    private String name;
    private String email;
    private String password;
    private RoleType role;
    private Set<Board> boards;
}
