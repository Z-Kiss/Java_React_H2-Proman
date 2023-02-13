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

    public List<String> registerUser(RegisterUserRequest user) {
        List<String> response = new ArrayList<>();
        if(user.hasAllInformation()){
            if (userRepository.existsByEmailOrName(user.getEmail(), user.getName())){
                if(userRepository.existsByName(user.getName())){
                    response.add("Username already exist");
                }
                if(userRepository.existsByEmail(user.getEmail())){
                    response.add("Email already registered");
                }
            }else {
                userRepository.save(new AppUser(user));
            }
        }else {
            response.add("Missing User Information");
        }



        return response;
    }

}
