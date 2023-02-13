package com.zkiss.proman.controller;

import com.zkiss.proman.modal.DTO.RegisterUserRequest;
import com.zkiss.proman.service.SessionService;
import com.zkiss.proman.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    private SessionService sessionService;



    @Autowired
    public UserController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    //TODO Consultation about methods not just changing state but returning object
    @PostMapping("/register")
    public ResponseEntity<List<String>> registerUser(@RequestBody RegisterUserRequest userRequest) {
        try{
            userService.registerUser(userRequest);
            return ResponseEntity.ok().build();
        }catch (org.springframework.dao.DataIntegrityViolationException ignore){
            return createResponseEntityWithErrorMessages(userRequest);
        }
    }

    private ResponseEntity<List<String>> createResponseEntityWithErrorMessages(RegisterUserRequest userRequest){
       List<String> errorMessage = userService.gatherErrorMessagesForRegisterUser(userRequest);
       return ResponseEntity.status(400).body(errorMessage);
    }

    @PostMapping("/login")
    public void loginUser(){

    }
}
