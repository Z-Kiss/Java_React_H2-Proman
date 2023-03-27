package com.zkiss.proman.model;

import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import jakarta.persistence.*;
import lombok.*;

//@Data
@Getter
@Setter
@NoArgsConstructor
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "APP_USER_ID", nullable = false)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleType role;

    public AppUser(UserRegisterRequest userRequest){
        this.name = userRequest.getName();
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
        this.role = RoleType.USER;
    }


    public void update(AppUser updatedUser){
        if(updatedUser.getName() != null){this.setName(updatedUser.getName());}
        if(updatedUser.getEmail() != null){this.setEmail(updatedUser.getEmail());}
        if(updatedUser.getPassword() != null){this.setPassword(updatedUser.getPassword());}
        if(updatedUser.getRole() != null){this.setRole(updatedUser.getRole());}
    }


}
