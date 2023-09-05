package com.example.flashcarding2gether.DTO;

import lombok.*;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LessonResponse {
    private String title;

    private String subject;

    private String creationDate;

    private boolean isPublic;

    private String username;

    private List<FlashcardResponse> flashcards;
}
