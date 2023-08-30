package com.example.flashcarding2gether.DTO;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdateResponse {
    private String username;

    private boolean successful;

    private String reason;
}
