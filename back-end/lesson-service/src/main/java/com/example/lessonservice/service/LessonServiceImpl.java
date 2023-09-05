package com.example.lessonservice.service;

import com.example.lessonservice.DAO.LessonDAO;
import com.example.lessonservice.DTO.FlashcardRequest;
import com.example.lessonservice.DTO.FlashcardResponse;
import com.example.lessonservice.DTO.LessonRequest;
import com.example.lessonservice.DTO.LessonResponse;
import com.example.lessonservice.entity.Flashcard;
import com.example.lessonservice.entity.Lesson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class LessonServiceImpl implements LessonService{

    @Autowired
    private LessonDAO lessonDAO;

    @Override
    public List<LessonResponse> findAll() {
        return mapLessonListToLessonResponseList(lessonDAO.findAll());
    }

    @Override
    public List<LessonResponse> findByUsername(String username) {
        return mapLessonListToLessonResponseList(lessonDAO.findByUsername(username));
    }

    @Override
    public List<LessonResponse>  createLesson(LessonRequest lessonRequest) {
        Lesson lessonToAdd = new Lesson();

        lessonToAdd.setTitle(lessonRequest.getTitle());
        lessonToAdd.setSubject(lessonRequest.getSubject());
        lessonToAdd.setCreationDate(lessonRequest.getCreationDate());
        lessonToAdd.setPublic(lessonRequest.isPublic());
        lessonToAdd.setUsername(lessonRequest.getUsername());
        lessonToAdd.setDescription(lessonRequest.getDescription());
        lessonToAdd.setFlashcards(mapFlashcardRequestToFlashcardList(lessonRequest.getFlashcards()));

        Lesson returnLesson = lessonDAO.save(lessonToAdd);

        return this.findByUsername(returnLesson.getUsername());
    }

    @Override
    public LessonResponse findById(Long id){
        Optional<Lesson> optionalLesson = lessonDAO.findById(id);
        Lesson lessonResponse =  null;
        if(optionalLesson.isPresent()){
            lessonResponse = optionalLesson.get();

            LessonResponse response = LessonResponse.builder()
                    .id(lessonResponse.getId())
                    .title(lessonResponse.getTitle())
                    .subject(lessonResponse.getSubject())
                    .creationDate(lessonResponse.getCreationDate())
                    .isPublic(lessonResponse.isPublic())
                    .username(lessonResponse.getUsername())
                    .description(lessonResponse.getDescription())
                    .flashcards(mapFlashcardListToFlashcardResponse(lessonResponse.getFlashcards()))
                    .build();
            return response;
        } else {
            throw new RuntimeException("Lesson not found for id: " + id);
        }
    }

    @Override
    public LessonResponse updateLesson(LessonRequest lessonRequest) {
        return null;
    }

    //maps lessons to a lesson response list (DTO)
    private List<LessonResponse> mapLessonListToLessonResponseList(List<Lesson> lessons){
        List<LessonResponse> lessonResponseList = new ArrayList<>();
        for(Lesson lesson : lessons){
            LessonResponse lessonResponse = LessonResponse.builder()
                    .id(lesson.getId())
                    .title(lesson.getTitle())
                    .subject(lesson.getSubject())
                    .creationDate(lesson.getCreationDate())
                    .isPublic(lesson.isPublic())
                    .username(lesson.getUsername())
                    .description(lesson.getDescription())
                    .flashcards(mapFlashcardListToFlashcardResponse(lesson.getFlashcards()))
                    .build();
            lessonResponseList.add(lessonResponse);
        }
        return lessonResponseList;
    }

    //returns a flashcardresponse list from a flashcard list (entitity to DTO)
    private List<FlashcardResponse> mapFlashcardListToFlashcardResponse(List<Flashcard> flashcards) {
        List<FlashcardResponse> flashcardResponseList = new ArrayList<>();
        for(Flashcard flashcard: flashcards){
            FlashcardResponse flashcardResponse = FlashcardResponse.builder()
                    .term(flashcard.getTerm())
                    .description(flashcard.getDescription())
                    .build();
            flashcardResponseList.add(flashcardResponse);
        }
        return flashcardResponseList;
    }

    //returns a flashcard list from a flashcard request object (DTO to entity)
    private List<Flashcard> mapFlashcardRequestToFlashcardList(List<FlashcardRequest> flashcards) {
        List<Flashcard> flashcardList = new ArrayList<>();
        for(FlashcardRequest flashcardRequest : flashcards){
            Flashcard flashcard = new Flashcard();
            flashcard.setTerm(flashcardRequest.getTerm());
            flashcard.setDescription(flashcardRequest.getDescription());
            flashcardList.add(flashcard);
        }
        return flashcardList;
    }

}
