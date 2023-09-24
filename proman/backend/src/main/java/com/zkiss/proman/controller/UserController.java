package com.zkiss.proman.controller;

import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserInfo;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@RequestBody UserRegisterRequest userRequest) {
        String jwtToken = userService.registerUser(userRequest);
        if(jwtToken != null){
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(409).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody UserLoginRequest loginRequest) {
        AuthenticationResponse authResponse = userService.loginUser(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("/me")
    public UserInfo checkOnMe(@RequestHeader(HttpHeaders.AUTHORIZATION) String header){
        String token = jwtService.extractToken(header);
        String email = jwtService.extractEmail(token);
        AppUser user = userService.getAppUserByEmail(email);
        return new UserInfo(user);
    }
}
