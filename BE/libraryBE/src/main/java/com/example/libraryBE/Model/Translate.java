package com.example.libraryBE.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Translate {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;
    private String body;
    private String bodyTranslate;
    private String languages;

    public Translate(String body, String bodyTranslate, String languages) {
        this.body = body;
        this.bodyTranslate = bodyTranslate;
        this.languages = languages;
    }
}
