package com.zkiss.proman.modal;

import com.zkiss.proman.modal.DTO.boardDTO.BoardCreateRequest;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
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

    private String boardColor;

    private boolean favorite;

    @OneToMany(mappedBy = "board")
    private Set<BoardColumn> boardColumn = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "APP_USER_ID" )
    private AppUser appUser;

    public Board(BoardCreateRequest createRequest, AppUser appUser) {
        this.boardName = createRequest.getName();
        this.boardColor = createRequest.getColor();
        this.appUser = appUser;
    }
}
