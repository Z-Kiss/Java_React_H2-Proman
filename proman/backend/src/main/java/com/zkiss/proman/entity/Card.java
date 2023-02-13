package com.zkiss.proman.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "CARD_ID")
    private Long id;

    private String cardTitle;

    private String cardDescription;

    private int cardOrder;

    private String color;

    @ManyToOne
    @JoinColumn(name = "COLUMN_ID")
    private BoardColumn boardColumn;

}
