package com.zkiss.proman.controller;

import com.google.gson.Gson;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.service.SessionService;
import com.zkiss.proman.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private Gson gson = new Gson();

    private UserService userService;

     private SessionService sessionService;



    @Autowired
    public UserController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }


    @PostMapping("/register")
    public ResponseEntity<List<String>> registerUser(@RequestBody UserRegisterRequest userRequest) {
        try{
            userService.registerUser(userRequest);
            return ResponseEntity.ok().build();
        }catch (org.springframework.dao.DataIntegrityViolationException ignore){
            return createResponseEntityWithErrorMessagesForUserRegister(userRequest);
        }
    }

    private ResponseEntity<List<String>> createResponseEntityWithErrorMessagesForUserRegister(UserRegisterRequest userRequest){
       List<String> errorMessage = userService.gatherErrorMessagesForRegisterUser(userRequest);
       return ResponseEntity.status(400).body(errorMessage);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginRequest loginRequest){
        if(userService.login(loginRequest)){
            putUserIdToSession(loginRequest);
            String appUserName = userService.getUserNameById(sessionService.get("userId"));
            return ResponseEntity.ok().body(gson.toJson(appUserName));
        }else {
            return ResponseEntity.status(401).body(gson.toJson("Wrong E-mail/Password combination"));
        }
    }


    private void putUserIdToSession(UserLoginRequest loginRequest){
        Long userId = userService.getIdByEmail(loginRequest.getEmail());
        sessionService.put("userId", userId);
    }

    @GetMapping("/logout")
    public void userLogout(){
        sessionService.clear();
    }

    //TODO figure out the secure way
    @PutMapping("/update")
    public void userUpdate(@RequestBody AppUser user){
        user.setId(sessionService.get("userId"));
        userService.updateUser(user);
    }

    @GetMapping
    public String loggedInUser(){
        String loggedInUserName = null;
        if(sessionService.get("userId") != null){
           loggedInUserName = userService.getUserNameById(sessionService.get("userId"));
        }
        return gson.toJson(loggedInUserName);
    }
}
