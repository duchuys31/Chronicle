package com.example.libraryBE.Controller;

import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.BuyAndBorrow;
import com.example.libraryBE.Model.Comment;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.CommentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/listCommentOfBook")
    public List<Comment> commentList(
            @RequestBody Map<String, Object> body
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("book");
        obj.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(obj);
        Book book = objectMapper.readValue(json, Book.class);
        List<Comment> commentList = commentRepository.findByBook(book);
        return commentList;
    }

    @GetMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN' or principal.roles == 'USER' or principal.roles == 'MEMBER'")
    public Comment comment(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUser customUser
    ) {
        Comment comment = new Comment();
        if (commentRepository.existsById(Integer.parseInt(id))) {
            comment = commentRepository.getReferenceById(Integer.parseInt(id));
        }
        return comment;
    }

    @PostMapping("/send")
    @PreAuthorize("principal.roles == 'ADMIN' or principal.roles == 'USER' or principal.roles == 'MEMBER'")
    public ResponseEntity<List<Comment>> send(
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal CustomUser customUser
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("comment");
        Map<String, Object> objBook = (Map<String, Object>) obj.get("book");
        objBook.remove("hibernateLazyInitializer");
        obj.remove("hibernateLazyInitializer");
        obj.put("book", objBook);
        String json = objectMapper.writeValueAsString(obj);
        Comment comment = objectMapper.readValue(json, Comment.class);
        comment.setDate(LocalDate.now().toString());
        if (comment.getBody().length() > 0) {
            if(comment.getId() != 0){
                commentRepository.deleteById(comment.getId());
            }
            commentRepository.save(comment);
            List<Comment> commentList = commentRepository.findByBook(comment.getBook());
            return ResponseEntity.status(200).body(commentList);
        }
        return ResponseEntity.status(400).body(null);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN' or principal.roles == 'USER' or principal.roles == 'MEMBER'")
    public ResponseEntity<List<Comment>> delete(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal CustomUser customUser
    ) throws JsonProcessingException {
        commentRepository.deleteById(Integer.parseInt(id));
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("book");
        obj.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(obj);
        Book book = objectMapper.readValue(json, Book.class);
        List<Comment> commentList = commentRepository.findByBook(book);
        return ResponseEntity.status(200).body(commentList);
    }
}
