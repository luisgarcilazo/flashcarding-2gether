package com.example.lessonservice.DTO;

import com.example.lessonservice.entity.Flashcard;
import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LessonResponse {

    private Long id;

    private String title;

    private String subject;

    private String creationDate;

    private boolean isPublic;

    private String username;

    private String description;

    private List<FlashcardResponse> flashcards;
}
