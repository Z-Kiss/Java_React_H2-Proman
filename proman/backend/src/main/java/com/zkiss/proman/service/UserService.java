package com.zkiss.proman.service;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
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

    public void registerUser(UserRegisterRequest user) {
        userRepository.save(new AppUser(user));
    }

    public List<String> gatherErrorMessagesForRegisterUser(UserRegisterRequest userRequest){
        List<String> errorMessages = new ArrayList<>();
        if(userRequest.hasNoNullField()){
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

    //Not final solution
    //TODO SecureLogin
    public boolean login(UserLoginRequest loginRequest) {
        AppUser user = userRepository.getAppUserByEmail(loginRequest.getEmail());
        if(user != null){
            return user.checkPassword(loginRequest.getPassword());
        } else {
            return false;
        }
    }

    public Long getIdByEmail(String email) {
        AppUser user = getAppUserByEmail(email);
        return user.getId();
    }

    private AppUser getAppUserByEmail(String email){
        return userRepository.getAppUserByEmail(email);
    }


    public AppUser getAppUserById(Long userId) {
       return userRepository.getAppUserById(userId);
    }

    public void updateUser(AppUser updatedUser) {
        AppUser user = userRepository.getAppUserById(updatedUser.getId());
        user.update(updatedUser);
        userRepository.save(user);
    }

    public String getUserNameById(Long userId) {
        return userRepository.getAppUserById(userId).getName();
    }
}
