package com.zkiss.proman.controller;

import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CreateCardResponse;
import com.zkiss.proman.service.CardService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardController {

    private CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping()
    public ResponseEntity<CreateCardResponse> createCard(@Valid @RequestBody CardCreateRequest createRequest) {
        CreateCardResponse response = cardService.registerCard(createRequest);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping()
    public void updateCard(@RequestBody Card card) {
        cardService.update(card);
    }

    @PutMapping("/update-cards-board-columns")
    public void updateCardsBoardColumn(@Valid @RequestBody CardBoardColumnUpdateRequest updateRequest) {
        cardService.update(updateRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable("id") Long id) {
        cardService.delete(id);
    }
}
