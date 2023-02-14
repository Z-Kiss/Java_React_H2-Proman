package com.zkiss.proman.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.modal.DTO.boardDTO.CardCreateRequest;
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

    private Integer cardOrder;

    private String color;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "COLUMN_ID")
    @JsonIgnore
    private BoardColumn boardColumn;

    public Card(CardCreateRequest createRequest,BoardColumn boardColumn) {
        this.boardColumn = boardColumn;
        this.cardOrder = boardColumn.getCards().size();
        this.cardTitle = createRequest.getCardTitle();
        this.cardDescription = createRequest.getCardDescription();
        this.color = createRequest.getCardColor();
    }

    public void update(Card updatedCard) {
        if(updatedCard.getCardDescription() != null){this.setCardDescription(updatedCard.getCardDescription());}
        if(updatedCard.getCardTitle() != null){this.setCardTitle(updatedCard.getCardTitle());}
        if(updatedCard.getCardOrder() != null){this.setCardOrder(updatedCard.getCardOrder());}
        if(updatedCard.getColor() != null){this.setColor(updatedCard.getColor());}
        if(updatedCard.getBoardColumn() != null){this.setBoardColumn(updatedCard.getBoardColumn());}
    }
}
