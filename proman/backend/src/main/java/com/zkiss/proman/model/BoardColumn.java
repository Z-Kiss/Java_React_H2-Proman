package com.zkiss.proman.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    @JsonIgnore
    private Board board;

    @OrderColumn(name = "cardOrder")
    @OneToMany(mappedBy = "boardColumn", cascade = CascadeType.ALL)
    private List<Card> cards = new ArrayList<>();

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

    @Override
    public String toString() {
        return "BoardColumn{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", columnOrder=" + columnOrder +
                ", bgColor='" + bgColor + '\'' +
                ", textColor='" + textColor + '\'' +
                '}';
    }
}
