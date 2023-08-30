package com.example.lessonservice.DTO;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FlashcardRequest {

    private String term;

    private String description;
}
