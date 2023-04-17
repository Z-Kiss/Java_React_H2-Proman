package com.zkiss.proman.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    private String title;

    private String bgColor;

    private String textColor;

    private boolean favorite;

    @OrderColumn(name = "columnOrder")
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<BoardColumn> boardColumns = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "APP_USER_ID" )
    @JsonIgnore
    private AppUser appUser;

    public Board(BoardCreateRequest createRequest, AppUser appUser) {
        this.title = createRequest.getTitle();
        this.bgColor = createRequest.getBgColor();
        this.textColor= createRequest.getTextColor();
        this.appUser = appUser;
    }

    public void addBoardColumn(BoardColumn boardColumn){
        boardColumns.add(boardColumn);
    }

    public void update(Board board){
        if(board.getTitle() != null){this.setTitle(board.getTitle());}
        if(board.getBgColor() != null){this.setBgColor(board.getBgColor());}
        if(board.getTextColor() != null){this.setTextColor(board.getTextColor());}
        if(board.getBoardColumns() != null){this.setBoardColumns(board.getBoardColumns());}
        this.setFavorite(board.isFavorite());
    }
}
