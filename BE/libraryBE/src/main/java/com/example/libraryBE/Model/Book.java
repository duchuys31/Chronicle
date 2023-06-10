package com.example.libraryBE.Model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.cglib.core.Local;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int bookID;
    private String bookName;
    private String bookAuthor;
    private String bookImage;
    private String pageNumber;
    private String bookDescribe;
    private LocalDate bookDate;
    private String language;
    private String publisher;
    private int price;
    private int borrow;
    private int buy;
    public int point;
    private int sumBuy;
    @ManyToOne
    private Category category;

    public void setBookDate(String bookDate) {
        this.bookDate = LocalDate.parse(bookDate);
    }
}
