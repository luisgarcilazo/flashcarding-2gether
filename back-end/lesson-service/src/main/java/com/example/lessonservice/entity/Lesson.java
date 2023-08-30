package com.example.lessonservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="lessons")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name = "subject")
    private String subject;

    @Column(name = "creation_date")
    private String creationDate;


    @Column(name = "is_public")
    private boolean isPublic;

    @Column(name = "username")
    private String username;

    @Column(name = "description")
    private String description;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "lesson_flashcards",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "flashcard_id"))
    private List<Flashcard> flashcards;
}
