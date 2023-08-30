package com.example.lessonservice.service;

import com.example.lessonservice.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserInfoService extends UserDetailsService {


    //finds a user by username and returns it
    User findByUsername(String username);


}
