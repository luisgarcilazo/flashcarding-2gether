package com.example.lessonservice.service;

import java.util.List;

import com.example.lessonservice.DTO.LessonRequest;
import com.example.lessonservice.DTO.LessonResponse;
public interface LessonService {

    //gets all lessons and returns a list
    List<LessonResponse> findAll();

    //gets a lesson by id
    LessonResponse findById(Long id);

    //gets all lessons for a specific username
    List<LessonResponse> findByUsername(String username);

    List<LessonResponse> createLesson(LessonRequest lessonRequest);

    LessonResponse updateLesson(LessonRequest lessonRequest);

}
