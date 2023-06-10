package com.example.libraryBE.Repository;

import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.BuyAndBorrow;
import com.example.libraryBE.Model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyAndBorrowRepository extends JpaRepository<BuyAndBorrow, Integer> {
    List<BuyAndBorrow> findByUserAndBookAndBuyLessThanAndOptions(CustomUser customUser, Book book, int buy, String options);
    List<BuyAndBorrow> findBySent(int sent);
    List<BuyAndBorrow> findByUser(CustomUser customUser);
    List<BuyAndBorrow> findByBuyAndOptions(int buy, String options);
    List<BuyAndBorrow> findByBuyGreaterThanAndOptions(int buy, String options);

    List<BuyAndBorrow> findByBook(Book book);
}
