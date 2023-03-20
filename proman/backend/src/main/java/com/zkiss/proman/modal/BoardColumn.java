package com.zkiss.proman.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.modal.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import jakarta.persistence.*;
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

    private String title;
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer columnOrder;

    private String bgColor;

    private String textColor;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "BOARD_ID")
    @JsonIgnore
    private Board board;

    @OneToMany(mappedBy = "boardColumn", cascade = CascadeType.ALL)
    private Set<Card> cards = new HashSet<>();

    public BoardColumn(BoardColumnCreateRequest createRequest, Board board){
        this.bgColor = createRequest.getBgColor();
        this.textColor = createRequest.getTextColor();
        this.title = createRequest.getTitle();
        this.board = board;
        this.columnOrder = board.getBoardColumns().size();
    }

    public void update(BoardColumn boardColumn){
        if(boardColumn.getBoard() != null){this.setBoard(boardColumn.getBoard());}
        if(boardColumn.getColumnOrder() != null){this.setColumnOrder(boardColumn.getColumnOrder());}
        if(boardColumn.getTitle() != null){this.setTitle(boardColumn.getTitle());}
        if(boardColumn.getBgColor() != null){this.setBgColor(boardColumn.getBgColor());}
        if(boardColumn.getTextColor() != null){this.setTextColor(boardColumn.getTextColor());}
        if(boardColumn.getCards() != null){this.setCards(boardColumn.getCards());}
    }

    public void addCard(Card card) {
        cards.add(card);
    }
}
