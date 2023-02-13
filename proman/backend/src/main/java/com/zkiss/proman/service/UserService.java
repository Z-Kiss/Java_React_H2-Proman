package com.zkiss.proman.service;

import com.zkiss.proman.modal.AppUser;
import com.zkiss.proman.modal.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.modal.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.modal.DTO.userDTO.UserUpdateRequest;
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
    public boolean login(UserLoginRequest loginRequest) {
        return userRepository.existsByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
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
        updateUserFields(updatedUser, user);
        userRepository.save(user);
    }

    private void updateUserFields(AppUser updatedUser, AppUser user){
        if(updatedUser.getName() != null){user.setName(updatedUser.getName());}
        if(updatedUser.getEmail() != null){user.setEmail(updatedUser.getEmail());}
        if(updatedUser.getPassword() != null){user.setPassword(updatedUser.getPassword());}
        if(updatedUser.getRole() != null){user.setRole(updatedUser.getRole());}
        if(updatedUser.getBoards() != null){user.setBoards(updatedUser.getBoards());}
    }
}
