package com.example.libraryBE.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.BookRepository;
import com.example.libraryBE.Repository.CustomUserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.libraryBE.Repository.CategoryRepository;
import com.example.libraryBE.Model.Category;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping("api/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserRepository customUserRepository;

    @GetMapping("/list")
    public List<Category> Categories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category editCategory(@PathVariable String id) {
        System.out.println((id));
        Category category = new Category();
        if (categoryRepository.existsById(Integer.parseInt(id))) {
            category = categoryRepository.getReferenceById(Integer.parseInt(id));
        }

        return category;
    }//

    @PutMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<String> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal CustomUser customUser
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = (Map<String, Object>) body.get("category");
        map.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(map);
        Category category = objectMapper.readValue(json, Category.class);
        if (categoryRepository.findByNameAndId(category.getCategoryName(), category.getCategoryID()) == null){
            categoryRepository.save(category);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body("Name Already Exists!!!");
    }

    @PostMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<String> save(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal CustomUser customUser
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = (Map<String, Object>) body.get("category");
        map.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(map);
        Category category = objectMapper.readValue(json, Category.class);
        if (categoryRepository.findByNameAndId(category.getCategoryName(), category.getCategoryID()) == null){
            categoryRepository.save(category);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body("Name Already Exists!!!");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<Category> delete(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUser customUser
    ) throws IOException {
        if(categoryRepository.existsById(Integer.parseInt(id))){
            Category category = categoryRepository.getReferenceById(Integer.parseInt(id));
            List<Book> books = bookRepository.findByCategory(category);
            for(Book book: books){
                book.setCategory(null);
                bookRepository.save(book);
            }
            categoryRepository.deleteById(Integer.parseInt(id));
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }
}
