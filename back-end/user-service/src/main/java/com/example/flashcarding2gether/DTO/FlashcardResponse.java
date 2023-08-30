package com.example.flashcarding2gether.DTO;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FlashcardResponse {

    private String term;

    private String description;
}
