package com.zkiss.proman.service;

import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;


    public String registerUser(UserRegisterRequest userRegisterRequest) {
        AppUser appUser = AppUser.builder()
                .password(passwordEncoder.encode(userRegisterRequest.getPassword()))
                .name(userRegisterRequest.getName())
                .email(userRegisterRequest.getEmail())
                .role(RoleType.USER)
                .build();
        if (!userRepository.exists(Example.of(appUser))) {
            userRepository.save(appUser);
            return jwtService.generateToken(appUser);
        } else {
            return null;
        }
    }

    public AuthenticationResponse loginUser(UserLoginRequest loginRequest) {
        if (loginRequest.getEmail().equals("guest@guest.com")) {
            if (this.getAppUserByEmail("guest@guest.com") == null) {
                initGuest();
            }
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        AppUser appUser = userRepository.getAppUserByEmail(loginRequest.getEmail())
                .orElseThrow();
        String jwToken = jwtService.generateToken(appUser);
        return AuthenticationResponse.builder()
                .token(jwToken)
                .build();
    }

    private void initGuest() {
        this.registerUser(UserRegisterRequest.builder()
                .email("guest@guest.com")
                .name("Guest")
                .password("guestguest")
                .role(RoleType.GUEST)
                .build());
    }

    public AppUser getAppUserById(UUID userId) {
        return userRepository.getAppUserById(userId);
    }

    public AppUser getAppUserByEmail(String email) {
        return userRepository.getAppUserByEmail(email)
                .orElse(null);
    }
}
