package com.example.libraryBE.Controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.*;
import com.example.libraryBE.Repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@CrossOrigin
@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private RatingRepository ratingRepository;


    @Autowired
    private BuyAndBorrowRepository buyAndBorrowRepository;
    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/list")
    public List<Book> Books() throws IOException {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id) {
        if(id.equals("undefined")) return  null;
        Book book = new Book();
        if (bookRepository.existsById(Integer.parseInt(id))) {
            book = bookRepository.getReferenceById(Integer.parseInt(id));
        }
        else {
            book.setPoint(5);
        }
        return book;
    }

    @PostMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<String> save(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal CustomUser customUser
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("book");
        obj.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(obj);
        Book book = objectMapper.readValue(json, Book.class);
        List<Book> books = bookRepository.findByBookNameAndBookAuthorAndBookIDNot(book.getBookName(), book.getBookAuthor(), book.getBookID());
        System.out.println(books.size());
        if(books.size() > 0){
            return  ResponseEntity.status(400).body(null);
        }
        Category category = categoryRepository.getReferenceById(book.getCategory().getCategoryID());
        category.setSumBook(category.getSumBook() + 1);
        categoryRepository.save(category);
        bookRepository.save(book);
        return ResponseEntity.status(200).body(null);
    }

    @PutMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<Book> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal CustomUser customUser
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("book");
        obj.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(obj);
        Book book = objectMapper.readValue(json, Book.class);
        List<Book> books = bookRepository.findByBookNameAndBookAuthorAndBookIDNot(book.getBookName(), book.getBookAuthor(), book.getBookID());
        System.out.println(books.size());
        if(books.size() > 0){
            return  ResponseEntity.status(400).body(null);
        }
        Book oldBook = bookRepository.getReferenceById(book.getBookID());
        if (oldBook.getCategory().getCategoryID() != book.getCategory().getCategoryID()) {
            Category category1 = categoryRepository.getReferenceById(oldBook.getCategory().getCategoryID());
            Category category2 = categoryRepository.getReferenceById(book.getCategory().getCategoryID());
            category1.setSumBook(category1.getSumBook() - 1);
            category2.setSumBook(category2.getSumBook() + 1);
            categoryRepository.save(category1);
            categoryRepository.save(category2);
        }
        bookRepository.save(book);
        return ResponseEntity.status(200).body(null);

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<String> DeleteBook(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        Book book = bookRepository.getReferenceById(Integer.parseInt(id));
        List<Comment> commentList = commentRepository.findByBook(book);
        for(Comment comment: commentList){
            commentRepository.deleteById(comment.getId());
        }
        List<Rating> ratingList = ratingRepository.findByBook(book);
        for(Rating rating: ratingList){
            ratingRepository.deleteById(rating.getId());
        }
        List<BuyAndBorrow> buyAndBorrowList = buyAndBorrowRepository.findByBook(book);
        for(BuyAndBorrow buyAndBorrow: buyAndBorrowList){
            buyAndBorrow.setBook(null);
            buyAndBorrowRepository.save(buyAndBorrow);
        }
        bookRepository.deleteById(Integer.parseInt(id));
        return ResponseEntity.status(200).body(null);
    }
}
