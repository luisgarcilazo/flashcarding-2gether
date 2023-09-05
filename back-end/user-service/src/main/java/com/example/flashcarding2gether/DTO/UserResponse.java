package com.example.flashcarding2gether.DTO;

import com.example.flashcarding2gether.entity.Lesson;
import com.example.flashcarding2gether.entity.Role;
import lombok.*;

import java.util.Collection;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {
    private String username;
    private String email;

    private Collection<Role> roles;

    private Collection<LessonResponse> lessons;
}
