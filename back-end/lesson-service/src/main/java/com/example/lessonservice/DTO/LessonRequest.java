package com.example.lessonservice.DTO;

import com.example.lessonservice.entity.Flashcard;
import lombok.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.Date;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LessonRequest {

    private String title;

    private String subject;

    private String creationDate;

    private boolean isPublic;

    private String username;

    private String description;

    private List<FlashcardRequest> flashcards;
}
