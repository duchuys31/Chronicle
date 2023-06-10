package com.example.libraryBE.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.Category;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByCategory(Category category);
    List<Book> findByBookNameAndBookAuthorAndBookIDNot(String bookName, String bookAuthor, int bookID);
}
