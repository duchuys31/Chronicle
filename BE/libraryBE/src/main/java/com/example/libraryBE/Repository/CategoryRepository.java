package com.example.libraryBE.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.libraryBE.Model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT b FROM Category b WHERE b.categoryName = :name AND b.categoryID != :id")
    Category findByNameAndId(@Param("name") String name, @Param("id") int id);
}
