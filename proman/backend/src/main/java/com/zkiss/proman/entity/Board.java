package com.zkiss.proman.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "BOARD_ID")
    private Long id;

    private String boardName;

    private String color;

    private boolean favorite;

    @OneToMany(mappedBy = "board")
    private Set<BoardColumn> boardColumn;

    @ManyToOne
    @JoinColumn(name = "APP_USER_ID" )
    private AppUser appUser;


}
