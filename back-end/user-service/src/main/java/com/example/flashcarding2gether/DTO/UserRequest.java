package com.example.flashcarding2gether.DTO;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequest {

    private String username;

    private String password;

    private String email;
}
