package com.zkiss.proman.controller;

import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CreateCardResponse;
import com.zkiss.proman.service.CardService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @PostMapping()
    public ResponseEntity<CreateCardResponse> createCard(@Valid @RequestBody CardCreateRequest createRequest) {
        try{
            CreateCardResponse response = cardService.registerCard(createRequest);
            return ResponseEntity.ok().body(response);
        }catch (EntityNotFoundException error){
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping()
    public ResponseEntity<?> updateCard(@RequestBody Card card) {
        try{
            cardService.update(card);
            return ResponseEntity.ok().build();
        }catch (EntityNotFoundException error){
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping("/update-cards-board-columns")
    public ResponseEntity<?> updateCardsBoardColumn(@Valid @RequestBody CardBoardColumnUpdateRequest updateRequest) {
        try{
            cardService.update(updateRequest);
            return ResponseEntity.ok().build();
        }catch (EntityNotFoundException error){
            return ResponseEntity.badRequest().build();
        }

    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable("id") Long id) {
        cardService.delete(id);
    }
}
