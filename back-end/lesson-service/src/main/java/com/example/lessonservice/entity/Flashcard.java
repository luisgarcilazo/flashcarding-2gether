package com.example.lessonservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="flashcards")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Flashcard {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "term")
    private String term;

    @Column(name = "description")
    private String description;
}
