package com.zkiss.proman.controller;

import com.zkiss.proman.modal.DTO.RegisterUserRequest;
import com.zkiss.proman.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<List<String>> registerUser(@RequestBody RegisterUserRequest userRequest) {
        List<String> response = new ArrayList<>();
        response.addAll(userService.registerUser(userRequest));

        if(response.size() == 0){
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(400).body(response);
        }
    }
}
