package com.example.flashcarding2gether.DAO;

import com.example.flashcarding2gether.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends JpaRepository<Role, Long> {
}
