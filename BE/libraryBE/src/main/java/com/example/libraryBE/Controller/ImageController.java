package com.example.libraryBE.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.CustomUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping("api/image")
public class ImageController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserRepository customUserRepository;

    @PostMapping("/upload")
    @PreAuthorize("principal.roles == 'ADMIN'")
    public ResponseEntity<String> upload(
            @RequestParam("image") MultipartFile image,
            @AuthenticationPrincipal CustomUser customUser
    ) throws IOException {

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dhcy49bp5",
                "api_key", "517185659862142",
                "api_secret", "0slnigkfesrcBlZfyvcMffp29UY"));
        File imageFile = File.createTempFile("temp", image.getOriginalFilename());
        image.transferTo(imageFile);
        Map uploadResult = cloudinary.uploader().upload(imageFile, ObjectUtils.emptyMap());
        String imageUrl = (String) uploadResult.get("url");
        System.out.println(imageUrl);
        return ResponseEntity.status(200).body(imageUrl);
    }
}
