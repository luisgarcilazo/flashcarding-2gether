package com.example.lessonservice.DAO;

import com.example.lessonservice.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonDAO extends JpaRepository<Lesson, Long> {

    @Query(value="SELECT * FROM LESSONS WHERE username = ?1", nativeQuery= true)
    List<Lesson> findByUsername(String username);

}
