package com.zkiss.proman.controller;

import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserInfo;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest userRequest) {
        try {
            userService.registerUser(userRequest);
            return ResponseEntity.status(201).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginRequest loginRequest) {
        try {
            AuthenticationResponse authResponse = userService.loginUser(loginRequest);
            return ResponseEntity.ok(authResponse);
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfo> checkOnMe(@RequestHeader(HttpHeaders.AUTHORIZATION) String header) {
        String email = this.extractEmailFromHeader(header);
        try {
            AppUser user = userService.getAppUserByEmail(email);
            return ResponseEntity.ok(new UserInfo(user));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private String extractEmailFromHeader(String header) {
        String token = jwtService.extractToken(header);
        return jwtService.extractEmail(token);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String header, @PathVariable UUID id) {
        String emailOfSender = this.extractEmailFromHeader(header);
        try {
            userService.deleteUser(id, emailOfSender);
            return ResponseEntity.ok().build();
        } catch (BadCredentialsException | EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
