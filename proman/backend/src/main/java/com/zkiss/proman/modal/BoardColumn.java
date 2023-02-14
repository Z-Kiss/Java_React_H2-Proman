package com.zkiss.proman.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.modal.DTO.boardDTO.BoardColumnCreateRequest;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

//@Data
@Getter
@Setter
@NoArgsConstructor
@Entity
public class BoardColumn {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "COLUMN_ID", nullable = false)
    private Long id;

    private String columnTitle;
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer columnOrder;

    private String color;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "BOARD_ID")
    @JsonIgnore
    private Board board;

    @OneToMany(mappedBy = "boardColumn", cascade = CascadeType.ALL)
    private Set<Card> cards = new HashSet<>();

    public BoardColumn(BoardColumnCreateRequest createRequest, Board board){
        this.color = createRequest.getBoardColumnColor();
        this.columnTitle = createRequest.getBoardColumnTitle();
        this.board = board;
        this.columnOrder = board.getBoardColumns().size();
    }

    public void update(BoardColumn boardColumn){
        if(boardColumn.getBoard() != null){this.setBoard(boardColumn.getBoard());}
        if(boardColumn.getColumnOrder() != null){this.setColumnOrder(boardColumn.getColumnOrder());}
        if(boardColumn.getColumnTitle() != null){this.setColumnTitle(boardColumn.getColumnTitle());}
        if(boardColumn.getColor() != null){this.setColor(boardColumn.getColor());}
        if(boardColumn.getCards() != null){this.setCards(boardColumn.getCards());}
    }

}
