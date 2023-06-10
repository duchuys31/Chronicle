package com.example.libraryBE.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String body;
    private LocalDate date;
    @ManyToOne private CustomUser user;
    @ManyToOne private  Book book;

    public void setDate(String date) {
        if(date != null){
            this.date = LocalDate.parse(date);
        }
    }
}
