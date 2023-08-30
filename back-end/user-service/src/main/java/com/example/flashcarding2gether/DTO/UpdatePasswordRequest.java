package com.example.flashcarding2gether.DTO;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdatePasswordRequest {

    private String username;

    private String password;

    private String newPassword;

    private String email;

}
