package com.zkiss.proman.controller;

import com.zkiss.proman.model.Card;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardsBoardColumnUpdateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CreateCardResponse;
import com.zkiss.proman.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardController {

    private CardService cardService;
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/create")
    public ResponseEntity<CreateCardResponse> createCard(@RequestBody CardCreateRequest createRequest){
        if(createRequest.hasNoNullField()){
            CreateCardResponse response = cardService.registerCard(createRequest);
            return ResponseEntity.ok().body(response);
        }else {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("/update-single-card")
    public void updateCard(@RequestBody Card card){
        cardService.update(card);
    }

    @PutMapping("/update-cards")
    public void updateCardsBoardColumn(@RequestBody CardsBoardColumnUpdateRequest updateRequest){
        cardService.update(updateRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable("id") Long id){
        cardService.delete(id);
    }

}
