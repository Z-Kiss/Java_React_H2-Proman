package com.zkiss.proman.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.modal.DTO.boardDTO.BoardCreateRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

//@Data
@Getter
@Setter
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
    private Set<BoardColumn> boardColumns = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "APP_USER_ID" )
    @JsonIgnore
    private AppUser appUser;

    public Board(BoardCreateRequest createRequest, AppUser appUser) {
        this.boardName = createRequest.getName();
        this.boardColor = createRequest.getColor();
        this.appUser = appUser;
    }

    public void addBoardColumn(BoardColumn boardColumn){
        boardColumns.add(boardColumn);
    }

    public void update(Board board){
        if(board.getBoardName() != null){this.setBoardName(board.getBoardName());}
        if(board.getBoardColor() != null){this.setBoardColor(board.getBoardColor());}
        if(board.getBoardColumns() != null){this.setBoardColumns(board.getBoardColumns());}
        this.setFavorite(board.isFavorite());
    }
}
