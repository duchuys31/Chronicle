package com.example.libraryBE.Model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class BuyAndBorrow {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String options;
    private LocalDate receiveDate;
    private LocalDate returnDate;
    private LocalDate extraDate;
    private int number;
    private int price;
    private int sent;
    private int purchases;
    private int buy;
    @ManyToOne private CustomUser user;
    @ManyToOne private Book book;

    public void setReceiveDate(String receiveDate) {
        if(receiveDate != null){
            this.receiveDate = LocalDate.parse(receiveDate);
        }
    }
    public void setReturnDate(String returnDate) {
        if (returnDate != null){
            this.returnDate = LocalDate.parse(returnDate);
        }
    }

    public void setExtraDate(String extraDate) {
        if(extraDate != null){
            this.extraDate = LocalDate.parse(extraDate);
        }
        else {
            this.extraDate = LocalDate.now();
        }
    }
}
