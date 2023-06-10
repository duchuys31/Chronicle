package com.example.libraryBE;

import com.example.libraryBE.GPT.GPT;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibraryBeApplication {

	public static void main(String[] args) {
//		System.out.println(GPT.GetResp("Cho tôi thông tin về học viện công nghệ bưu chính viễn thông PTIT ?"));
		SpringApplication.run(LibraryBeApplication.class, args);
	}

}
