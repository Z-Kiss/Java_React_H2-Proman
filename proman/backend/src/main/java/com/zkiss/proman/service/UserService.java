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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

//    public List<String> gatherErrorMessagesForRegisterUser(UserRegisterRequest userRequest){
//        List<String> errorMessages = new ArrayList<>();
//        if(userRequest.hasNoNullField()){
//            if (userRepository.existsByEmailOrName(userRequest.getEmail(), userRequest.getName())){
//                if(userRepository.existsByName(userRequest.getName())){
//                    errorMessages.add("Username already exist");
//                }
//                if(userRepository.existsByEmail(userRequest.getEmail())){
//                    errorMessages.add("Email already registered");
//                }
//            }
//        }else {
//            errorMessages.add("Missing User Information");
//        }
//        return errorMessages;
//    }


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

    public UUID getIdByEmail(String email) {
        AppUser user = getAppUserByEmail(email);
        return user.getId();
    }

    public AppUser getAppUserByEmail(String email){
        return userRepository.getAppUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


    public AppUser getAppUserById(UUID userId) {
       return userRepository.getAppUserById(userId);
    }

    public void updateUser(AppUser updatedUser) {
        AppUser user = userRepository.getAppUserById(updatedUser.getId());
        user.update(updatedUser);
        userRepository.save(user);
    }

    public String getUserNameById(UUID userId) {
        return userRepository.getAppUserById(userId).getName();
    }



    private String hashPassword(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt(10));
    }

    public Boolean checkPassword(String password, String userPassword){
        return BCrypt.checkpw(password, userPassword);
    }
}
