package com.zkiss.proman.modal;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class BoardColumn {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "COLUMN_ID", nullable = false)
    private Long id;

    private String columnName;

    private int columnOrder;

    private String color;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @OneToMany(mappedBy = "boardColumn")
    private Set<Card> cards = new HashSet<>();

}
