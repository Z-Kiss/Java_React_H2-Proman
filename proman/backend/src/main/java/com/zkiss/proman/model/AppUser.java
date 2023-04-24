package com.zkiss.proman.model;

import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.UUID;

//@Data
@Getter
@Setter
@NoArgsConstructor
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "APP_USER_ID", nullable = false)
    private UUID id;

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
        this.password = hashPassword(userRequest.getPassword());
        this.role = RoleType.USER;
    }


    public void update(AppUser updatedUser){
        if(updatedUser.getName() != null){this.setName(updatedUser.getName());}
        if(updatedUser.getEmail() != null){this.setEmail(updatedUser.getEmail());}
        if(updatedUser.getPassword() != null){this.setPassword(updatedUser.getPassword());}
        if(updatedUser.getRole() != null){this.setRole(updatedUser.getRole());}
    }

    private String hashPassword(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt(10));
    }

    public Boolean checkPassword(String password){
        return BCrypt.checkpw(password, this.password);
    }

}
