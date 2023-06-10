package com.example.libraryBE.Model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class CustomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
    private String firstName;
    private String lastName;
    private String address;
    private LocalDate date;
    private String phone;
    private String company;
    private String position;
    private String username;
    private String password;
    private String email;
    private String Roles;

    public void setDate(String date) {

        if(date != null){
            this.date = LocalDate.parse(date);
        }
    }
}
