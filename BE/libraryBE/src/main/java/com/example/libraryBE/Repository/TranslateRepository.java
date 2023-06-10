package com.example.libraryBE.Repository;

import com.example.libraryBE.Model.Translate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TranslateRepository extends JpaRepository<Translate, Integer> {
    List<Translate> findByBodyAndLanguages(String body, String languages);
}
