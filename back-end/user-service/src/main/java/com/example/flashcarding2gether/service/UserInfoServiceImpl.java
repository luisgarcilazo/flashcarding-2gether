package com.example.flashcarding2gether.service;

import com.example.flashcarding2gether.DAO.RoleDAO;
import com.example.flashcarding2gether.DAO.UserDAO;
import com.example.flashcarding2gether.DTO.*;
import com.example.flashcarding2gether.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.flashcarding2gether.entity.User;
import org.springframework.http.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserInfoServiceImpl implements UserInfoService{

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<UserResponse> findAll() {
        return mapUserToUserResponseList(userDAO.findAll());
    }



    //help from https://stackoverflow.com/questions/16781680/http-get-with-headers-using-resttemplate and
    //https://www.baeldung.com/rest-template and
    //https://stackoverflow.com/questions/47611062/using-resttemplate-to-map-json-to-object
    @Override
    public UserResponse findByUsername(String username) {
        Optional<User> optionalUser = this.userDAO.findById(username);
        User user = null;
        if(optionalUser.isPresent()){
            user = optionalUser.get();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            HttpEntity <List<LessonResponse>> entity = new HttpEntity<List<LessonResponse>>(headers);
            List lessons = restTemplate
                    .exchange("http://localhost:8060/lessons/user/"+user.getUsername(), HttpMethod.GET, entity, List.class).getBody();
            UserResponse userResponse = UserResponse.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .roles(user.getRoles())
                    .lessons(lessons)
                    .build();
            return userResponse;
        } else {
            throw new RuntimeException("User not found for username: " + username);
        }
    }

    @Override
    public UserResponse saveDev(UserRequest userRequest) {
        User userToAdd = new User();

        userToAdd.setUsername(userRequest.getUsername());
        userToAdd.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userToAdd.setEmail(userRequest.getEmail());
        userToAdd.setEnabled(true);
        userToAdd.setRoles(Arrays.asList(new Role(1L, "ROLE_DEVELOPER"),new Role(2L, "ROLE_BASIC")));
        //userToAdd.setLessons(new ArrayList<>());

        User returnUser = this.userDAO.save(userToAdd);

        return UserResponse.builder()
                .username(returnUser.getUsername())
                .email(returnUser.getEmail())
                .roles(returnUser.getRoles())
                //.lessons(returnUser.getLessons())
                .build();
    }

    @Override
    public UserResponse saveBasic(UserRequest userRequest) {
        User userToAdd = new User();

        userToAdd.setUsername(userRequest.getUsername());
        userToAdd.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userToAdd.setEmail(userRequest.getEmail());
        userToAdd.setEnabled(true);
        userToAdd.setRoles(Arrays.asList(new Role(2L, "ROLE_BASIC")));
        //userToAdd.setLessons(new ArrayList<>());

        User returnUser = this.userDAO.save(userToAdd);

        return UserResponse.builder()
                .username(returnUser.getUsername())
                .email(returnUser.getEmail())
                .roles(returnUser.getRoles())
                //.lessons(returnUser.getLessons())
                .build();
    }

    @Override
    public UserResponse checkUser(LoginRequest loginRequest) {
        Optional<User> optionalUser = this.userDAO.findById(loginRequest.getUsername());
        User user = null;
        if(optionalUser.isPresent()){
            user = optionalUser.get();
            //check if passwords are equal
            if(loginRequest.getUsername().equals(user.getUsername()) && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
                HttpHeaders headers = new HttpHeaders();
                headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
                HttpEntity <List<LessonResponse>> entity = new HttpEntity<List<LessonResponse>>(headers);
                List lessons = restTemplate
                        .exchange("http://localhost:8060/lessons/user/"+user.getUsername(), HttpMethod.GET, entity, List.class).getBody();
                UserResponse userResponse = UserResponse.builder()
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .roles(user.getRoles())
                        .lessons(lessons)
                        .build();
                return userResponse;
            } else {
                return new UserResponse();
            }
        } else {
            return new UserResponse();
        }
    }

    @Override
    public UpdateResponse changePassword(UpdatePasswordRequest updatePasswordRequest) {
        Optional<User> optionalUser =  this.userDAO.findById(updatePasswordRequest.getUsername());
        User user = null;
        if(optionalUser.isPresent()){
            user = optionalUser.get();
            if(user.getEmail().equals(updatePasswordRequest.getEmail())){
                //username and email match
                if(passwordEncoder.matches(updatePasswordRequest.getPassword(), user.getPassword())){
                    //password from database matches password provided
                    this.userDAO.updatePassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()),updatePasswordRequest.getUsername());
                    return UpdateResponse.builder()
                            .username(updatePasswordRequest.getUsername())
                            .successful(true)
                            .reason("Password successfully updated.")
                            .build();
                } else {
                    return UpdateResponse.builder()
                            .username(updatePasswordRequest.getUsername())
                            .successful(false)
                            .reason("Original password does not match.")
                            .build();
                }
            } else {
                return UpdateResponse.builder()
                        .username(updatePasswordRequest.getUsername())
                        .successful(false)
                        .reason("Incorrect email.")
                        .build();
            }
        } else {
            return UpdateResponse.builder()
                    .username(updatePasswordRequest.getUsername())
                    .successful(false)
                    .reason("Username does not exist.")
                    .build();
        }
    }

    //converts user list to DTO list
    //resttemplate help from from https://stackoverflow.com/questions/16781680/http-get-with-headers-using-resttemplate and
    //https://www.baeldung.com/rest-template and
    //https://stackoverflow.com/questions/47611062/using-resttemplate-to-map-json-to-object
    private List<UserResponse> mapUserToUserResponseList(List<User> users) {
        List<UserResponse> userResponseList = new ArrayList<>();
        for(User user: users) {
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            HttpEntity <List<LessonResponse>> entity = new HttpEntity<List<LessonResponse>>(headers);
            List lessons = restTemplate
                    .exchange("http://localhost:8060/lessons/"+user.getUsername(), HttpMethod.GET, entity, List.class).getBody();
            UserResponse userResponse = UserResponse.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .roles(user.getRoles())
                    .lessons(lessons)
                    .build();
            userResponseList.add(userResponse);
        }
        return userResponseList;
    }

    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    //loads a user by username, returns a UserDetails object that is used for authentication/validation
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = this.userDAO.findById(username);
        User user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                    mapRolesToAuthorities(user.getRoles()));
        }
        throw new UsernameNotFoundException("Invalid username or password.");
    }

    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    //maps a collection of roles to a list of authorities, used for authentication/validation
    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
