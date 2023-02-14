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

    private int columnOrder;

    private String color;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    @JsonIgnore
    private Board board;

    @OneToMany(mappedBy = "boardColumn")
    private Set<Card> cards = new HashSet<>();

    public BoardColumn(BoardColumnCreateRequest createRequest, Board board){
        this.color = createRequest.getBoardColumnColor();
        this.columnTitle = createRequest.getBoardColumnTitle();
        this.board = board;
    }

}
