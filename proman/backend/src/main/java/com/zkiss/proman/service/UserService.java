package com.zkiss.proman.service;

import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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

    @Transactional
    public void registerUser(UserRegisterRequest userRegisterRequest) {
        AppUser appUser = AppUser.builder()
                .password(passwordEncoder.encode(userRegisterRequest.getPassword()))
                .name(userRegisterRequest.getName())
                .email(userRegisterRequest.getEmail())
                .role(userRegisterRequest.getRole())
                .build();
        userRepository.save(appUser);
    }

    public AuthenticationResponse loginUser(UserLoginRequest loginRequest) {
        if (loginRequest.getEmail().equals("guest@guest.com")) {
            if (this.getAppUserByEmail("guest@guest.com") == null) {
                initGuest();
            }
        }
        AppUser appUser = userRepository.getAppUserByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Username/Password mismatch"));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
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
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("No user with Id: " + userId));
    }

    public AppUser getAppUserByEmail(String email) {
        return userRepository.getAppUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("No user with this email: " + email));
    }

    public void deleteUser(UUID id, String emailOfRequest) {
        AppUser userToDelete = userRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("User to Delete not found"));
        AppUser userOfRequest = userRepository.getAppUserByEmail(emailOfRequest).orElseThrow(()-> new EntityNotFoundException("Current user not found"));
        if(hasAuthorization(userToDelete, userOfRequest)){
            userRepository.deleteById(id);
        }else{
            throw new BadCredentialsException("Don't have authorization");
        }
    }

    private boolean hasAuthorization(AppUser userToDelete, AppUser userOfRequest){
        return userOfRequest.getRole() != RoleType.GUEST && (userToDelete.getId() == userOfRequest.getId() || userOfRequest.getRole().equals(RoleType.ADMIN));
    }
}
