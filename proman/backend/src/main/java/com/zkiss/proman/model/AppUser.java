package com.zkiss.proman.model;

import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements UserDetails {

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

    public AppUser(UserRegisterRequest userRequest) {
        this.name = userRequest.getName();
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
        this.role = RoleType.USER;
    }

    public void update(AppUser updatedUser) {
        if (updatedUser.getName() != null) {
            this.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null) {
            this.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPassword() != null) {
            this.setPassword(updatedUser.getPassword());
        }
        if (updatedUser.getRole() != null) {
            this.setRole(updatedUser.getRole());
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
