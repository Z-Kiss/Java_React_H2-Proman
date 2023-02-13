package com.zkiss.proman.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "APP_USER_ID", nullable = false)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String role;

    @OneToMany(mappedBy = "appUser")
    private Set<Board> boards;
}
