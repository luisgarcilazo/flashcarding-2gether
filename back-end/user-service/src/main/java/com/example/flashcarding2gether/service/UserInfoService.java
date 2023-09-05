package com.example.flashcarding2gether.service;


import com.example.flashcarding2gether.DTO.*;
import com.example.flashcarding2gether.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserInfoService extends UserDetailsService {

    //gets all users and returns a lit
    List<UserResponse> findAll();

    //finds a user by username and returns it
    UserResponse findByUsername(String username);


    //saves a developer user to the database
    UserResponse saveDev(UserRequest user);

    //saves a basic user to the database
    UserResponse saveBasic(UserRequest user);

    UserResponse checkUser(LoginRequest loginRequest);

    UpdateResponse changePassword(UpdatePasswordRequest updatePasswordRequest);
}
