package com.zkiss.proman.controller;

import com.google.gson.Gson;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.service.SessionService;
import com.zkiss.proman.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody UserRegisterRequest userRequest) {
        return ResponseEntity.ok(userService.registerUser(userRequest));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody UserLoginRequest loginRequest) {
        AuthenticationResponse authResponse = userService.loginUser(loginRequest);
        return ResponseEntity.ok(authResponse);
    }





}
