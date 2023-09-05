package com.example.lessonservice.controller;

import com.example.lessonservice.DTO.LessonRequest;
import com.example.lessonservice.DTO.LessonResponse;
import com.example.lessonservice.entity.Lesson;
import com.example.lessonservice.entity.User;
import com.example.lessonservice.service.LessonService;
import com.example.lessonservice.service.UserInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/lessons")
public class LessonController {

    private LessonService lessonService;

    private UserInfoService userInfoService;

    @Autowired
    public LessonController(UserInfoService userInfoService, LessonService lessonService){
        this.userInfoService = userInfoService;
        this.lessonService = lessonService;
    }

    // GET all lessons
    // Retrieves all lessons from the database
    @GetMapping("")
    public List<LessonResponse> findAll(){
        log.info("REQUEST: GET /lessons (ALL LESSONS)");
        List<LessonResponse> all = lessonService.findAll();
        log.info("RESPONSE: " + all);
        return all;
    }

    // GET /lessons/user/{username}
    // Retrieves all lessons from a specific user
    @GetMapping("/user/{username}")
    public List<LessonResponse> findLessonsByUsername(@PathVariable String username){
        log.info("REQUEST: GET /lessons/user/" + username);
        List<LessonResponse> response = null;
        try{
            response = lessonService.findByUsername(username);
            log.info("RESPONSE: " + response);
            return response;
        } catch(RuntimeException e){
            response = new ArrayList<>();
            log.info("RESPONSE: " + response);
            return response;
        }
    }

    // GET /lessons/{id}
    // Retrieves a lesson by id
    @GetMapping("/{id}")
    public LessonResponse findLessonById(@PathVariable Long id){
        log.info("REQUEST: GET /lessons/" + id);
        LessonResponse response = null;
        try{
            response = lessonService.findById(id);
            log.info("RESPONSE: " + response);
            return response;
        } catch(RuntimeException e){
            response = new LessonResponse();
            log.info("RESPONSE: " + response);
            return response;
        }
    }
    // POST /lessons
    // Posts a new lesson to the database, returns all of this user lessons
    @PostMapping("")
    public List<LessonResponse> createLesson(@RequestBody LessonRequest lessonRequest){
        log.info("REQUEST: POST /lessons/");
        log.info("BODY: " + lessonRequest);
        List<LessonResponse> lessonResponseList = lessonService.createLesson(lessonRequest);
        log.info("RESPONSE: " + lessonResponseList);
        return lessonResponseList;
    }

}
