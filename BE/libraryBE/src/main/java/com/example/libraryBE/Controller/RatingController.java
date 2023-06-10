package com.example.libraryBE.Controller;

import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.Comment;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Model.Rating;
import com.example.libraryBE.Repository.BookRepository;
import com.example.libraryBE.Repository.RatingRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/rating")
@RequiredArgsConstructor
public class RatingController {
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private BookRepository bookRepository;
    @PostMapping("/rate")
    @PreAuthorize("principal.roles == 'ADMIN' or principal.roles == 'USER' or principal.roles == 'MEMBER'")
    public Rating rating(
            @AuthenticationPrincipal CustomUser customUser,
            @RequestBody Map<String, Object> body
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("book");
        obj.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(obj);
        Book book = objectMapper.readValue(json, Book.class);
        Rating rating = new Rating();
        List<Rating> ratingList = ratingRepository.findByUserAndBook(customUser, book);
        if(ratingList.size() == 0){
            rating.setUser(customUser);
            rating.setBook(book);
            rating.setPoint(5);
        }
        else {
            for (int i = 1; i < ratingList.size(); i++){
                ratingRepository.deleteById(ratingList.get(i).getId());
            }
            rating = ratingList.get(0);
        }
        return rating;
    }
    @PostMapping("/update")
    @PreAuthorize("principal.roles == 'ADMIN' or principal.roles == 'USER' or principal.roles == 'MEMBER'")
    public Rating update(
            @AuthenticationPrincipal CustomUser customUser,
            @RequestBody Map<String, Object> body
    ) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(body);
        try{
            Map<String, Object> obj = (Map<String, Object>) body.get("rating");
            Map<String, Object> objBook = (Map<String, Object>) obj.get("book");
            objBook.remove("hibernateLazyInitializer");
            obj.remove("hibernateLazyInitializer");
            obj.put("book", objBook);
            String json = objectMapper.writeValueAsString(obj);
            Rating rating = objectMapper.readValue(json, Rating.class);
            ratingRepository.save(rating);
            Book book = bookRepository.getReferenceById(rating.getBook().getBookID());
            List<Rating> ratingList = ratingRepository.findByBook(book);
            int sum = 0, cnt = ratingList.size();
            for (Rating x : ratingList){
                sum += x.getPoint();
            }
            book.setPoint(sum / cnt);
            bookRepository.save(book);
            ratingList = ratingRepository.findByUserAndBook(customUser, book);
            rating = ratingList.get(0);
            return rating;
        } catch (Exception e){
            e.printStackTrace();;
        }
        return null;
    }
}
