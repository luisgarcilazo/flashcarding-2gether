package com.example.lessonservice.service;

import com.example.lessonservice.DAO.RoleDAO;
import com.example.lessonservice.DAO.UserDAO;
import com.example.lessonservice.entity.Role;
import com.example.lessonservice.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserInfoServiceImpl implements UserInfoService{

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public User findByUsername(String username) {
        Optional<User> optionalUser = this.userDAO.findById(username);
        User user = null;
        if(optionalUser.isPresent()){
            user = optionalUser.get();
            return user;
        } else {
            throw new RuntimeException("User not found for username: " + username);
        }
    }



    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    //loads a user by username, returns a UserDetails object that is used for authentication/validation
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        log.info("User authenticated has username:  " + user.getUsername());
        log.info("User authenticated has roles:  " + user.getRoles().toString());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    //maps a collection of roles to a list of authorities, used for authentication/validation
    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
