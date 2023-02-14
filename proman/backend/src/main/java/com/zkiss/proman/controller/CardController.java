package com.zkiss.proman.controller;

import com.zkiss.proman.modal.Card;
import com.zkiss.proman.modal.DTO.boardDTO.CardCreateRequest;
import com.zkiss.proman.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/card")
public class CardController {

    private CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCard(@RequestBody CardCreateRequest createRequest){
        if(createRequest.hasNoNullField()){
            cardService.registerCard(createRequest);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(401).body("Missing Card Information");
        }
    }

    @PostMapping("/update")
    public void updateCard(@RequestBody Card card){
        cardService.update(card);
    }

}
