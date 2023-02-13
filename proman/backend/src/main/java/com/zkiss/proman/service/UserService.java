package com.zkiss.proman.service;

import com.zkiss.proman.modal.AppUser;
import com.zkiss.proman.modal.DTO.RegisterUserRequest;
import com.zkiss.proman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(RegisterUserRequest user) {
        userRepository.save(new AppUser(user));
    }

    public List<String> gatherErrorMessagesForRegisterUser(RegisterUserRequest userRequest){
        List<String> errorMessages = new ArrayList<>();
        if(userRequest.hasAllInformation()){
            if (userRepository.existsByEmailOrName(userRequest.getEmail(), userRequest.getName())){
                if(userRepository.existsByName(userRequest.getName())){
                    errorMessages.add("Username already exist");
                }
                if(userRepository.existsByEmail(userRequest.getEmail())){
                    errorMessages.add("Email already registered");
                }
            }
        }else {
            errorMessages.add("Missing User Information");
        }
        return errorMessages;
    }
}
