package com.example.flashcarding2gether.controller;

import com.example.flashcarding2gether.DTO.*;
import com.example.flashcarding2gether.entity.User;
import com.example.flashcarding2gether.service.UserInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserDetailsController {

    private UserInfoService userInfoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserDetailsController(UserInfoService userInfoService){
        this.userInfoService = userInfoService;
    }

    // GET /users
    // Retrieves all users from the database
    @GetMapping("")
    public List<UserResponse> findAll(){
        log.info("REQUEST: GET /users (ALL USERS)");
        List<UserResponse> all = userInfoService.findAll();
        return all;
    }

    // GET /users/{username}
    @GetMapping("/{username}")
    public UserResponse findByUsername(@PathVariable String username){
        log.info("REQUEST: GET /users/" + username);
        UserResponse response = userInfoService.findByUsername(username);
        log.info("RESPONSE: " + response);
        return response;
    }
    // POST /users/basic
    // Creates a basic user
    @PostMapping("/basic")
    public UserResponse addBasicUser(@RequestBody UserRequest userRequest){
        log.info("REQUEST: POST /users/basic");
        log.info("BODY: " + userRequest);
        UserResponse dbUser = userInfoService.saveBasic(userRequest);
        log.info("RESPONSE: " + dbUser);
        return dbUser;
    }
    // POST /users/dev
    // Creates a dev user
    @PostMapping("/dev")
    public UserResponse addDevUser(@RequestBody UserRequest userRequest){
        log.info("REQUEST: POST /users/dev");
        log.info("BODY: " + userRequest);
        UserResponse dbUser = userInfoService.saveDev(userRequest);
        log.info("RESPONSE: " + dbUser);
        return dbUser;
    }


    // POST /users/login
    // Checks if the user details are correct
    @PostMapping("/login")
    public UserResponse checkUser(@RequestBody LoginRequest loginRequest){
        log.info("REQUEST: POST /users/login");
        log.info("BODY: " + loginRequest);
        UserResponse dbUser = userInfoService.checkUser(loginRequest);
        log.info("RESPONSE: " + dbUser);
        return dbUser;
    }

    // PUT /users/update/password
    // Update password for a username
    @PutMapping("/update/password")
    public UpdateResponse updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest){
        log.info("REQUEST: PUT /users/{username}/password");
        log.info("BODY: " + updatePasswordRequest);
        return this.userInfoService.changePassword(updatePasswordRequest);
    }
}
