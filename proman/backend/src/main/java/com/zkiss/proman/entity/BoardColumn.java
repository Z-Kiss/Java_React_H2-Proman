package com.zkiss.proman.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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

}
