package com.example.flashcarding2gether.entity;

import jakarta.persistence.*;
import lombok.*;

import javax.annotation.processing.Generated;

@Entity
@Table(name="role")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "name")
    private String name;

}
