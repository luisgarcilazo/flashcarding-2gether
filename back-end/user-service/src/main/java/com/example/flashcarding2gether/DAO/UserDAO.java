package com.example.flashcarding2gether.DAO;

import com.example.flashcarding2gether.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserDAO extends JpaRepository<User,String> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET password = ?1 WHERE username = ?2", nativeQuery = true)
    int updatePassword(String password, String username);
}
