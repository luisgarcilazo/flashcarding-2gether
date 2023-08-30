package com.example.flashcarding2gether.DTO;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequest {

    private String username;

    private String password;


}
