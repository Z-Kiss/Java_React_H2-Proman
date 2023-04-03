package com.zkiss.proman.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import jakarta.persistence.*;
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

    private String title;

    private String cardDescription;

    private Integer cardOrder;

    private String bgColor;

    private String textColor;

    @ManyToOne
    @JoinColumn(name = "COLUMN_ID")
    @JsonIgnore
    private BoardColumn boardColumn;

    public Card(CardCreateRequest createRequest,BoardColumn boardColumn) {
        this.boardColumn = boardColumn;
        this.cardOrder = boardColumn.getCards().size();
        this.title = createRequest.getTitle();
        this.cardDescription = createRequest.getCardDescription();
        this.bgColor = createRequest.getBgColor();
        this.textColor = createRequest.getTextColor();
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", cardOrder=" + cardOrder +
                ", boardColumn=" + boardColumn +
                '}';
    }

    public void update(Card updatedCard) {
        if(updatedCard.getCardDescription() != null){this.setCardDescription(updatedCard.getCardDescription());}
        if(updatedCard.getTitle() != null){this.setTitle(updatedCard.getTitle());}
        if(updatedCard.getCardOrder() != null){this.setCardOrder(updatedCard.getCardOrder());}
        if(updatedCard.getBgColor() != null){this.setBgColor(updatedCard.getBgColor());}
        if(updatedCard.getTextColor() != null){this.setTextColor(updatedCard.getTextColor());}
        if(updatedCard.getBoardColumn() != null){this.setBoardColumn(updatedCard.getBoardColumn());}
    }
}
