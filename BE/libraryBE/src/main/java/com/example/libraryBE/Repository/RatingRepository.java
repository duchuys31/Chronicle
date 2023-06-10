package com.example.libraryBE.Repository;

import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.BuyAndBorrow;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByUserAndBook(CustomUser customUser, Book book);
    List<Rating> findByBook(Book book);
}
