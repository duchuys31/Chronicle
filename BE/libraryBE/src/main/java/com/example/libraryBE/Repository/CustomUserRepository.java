package com.example.libraryBE.Repository;

import com.example.libraryBE.Model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomUserRepository extends JpaRepository<CustomUser, Integer> {
    CustomUser findUserByUsername(String username);
}



