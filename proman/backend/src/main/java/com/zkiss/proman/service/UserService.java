package com.zkiss.proman.service;

import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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


    public AuthenticationResponse registerUser(UserRegisterRequest userRegisterRequest) {
        AppUser appUser = AppUser.builder()
                .password(passwordEncoder.encode(userRegisterRequest.getPassword()))
                .name(userRegisterRequest.getName())
                .email(userRegisterRequest.getEmail())
                .role(RoleType.USER)
                .build();
        userRepository.save(appUser);
        String jwToken = jwtService.generateToken(appUser);
        return AuthenticationResponse.builder()
                .token(jwToken)
                .build();
    }

    public AuthenticationResponse loginUser(UserLoginRequest loginRequest) {
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

    public AppUser getAppUserById(UUID userId) {
       return userRepository.getAppUserById(userId);
    }
}
