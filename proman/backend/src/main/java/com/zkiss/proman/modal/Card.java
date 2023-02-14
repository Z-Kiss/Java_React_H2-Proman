package com.zkiss.proman.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Data
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "CARD_ID")
    private Long id;

    private String cardTitle;

    private String cardDescription;
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int cardOrder;

    private String color;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "COLUMN_ID")
    @JsonIgnore
    private BoardColumn boardColumn;

}
