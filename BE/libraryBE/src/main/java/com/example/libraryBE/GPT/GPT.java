package com.example.libraryBE.GPT;
import com.example.libraryBE.Translate.Language;
import com.example.libraryBE.Translate.Translator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@UtilityClass
public class GPT {
    public String GetResp(String question){
        String url = "https://api.openai.com/v1/chat/completions";
        String token = "sk-";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        // Build the request body
        String requestBody = "{\"model\": \"gpt-3.5-turbo\",\"messages\": [{\"role\": \"user\",\"content\": \"" + question + "\"}],\"temperature\": 1.0,\"top_p\": 1.0,\"n\": 1,\"stream\": false,\"presence_penalty\": 0,\"frequency_penalty\": 0}";

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String responseBody = response.getBody();

        // Process the response
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, Object> responseMap = objectMapper.readValue(responseBody, new TypeReference<Map<String, Object>>() {});

            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> choice = (Map<String, Object>) choices.get(0).get("message");
            responseBody = (String) choice.get("content");

        } catch (IOException e) {
            e.printStackTrace();
        }
        return  responseBody;
    }
    public Map<String, String> Translate(Map<String, String> words, String language1, String language2) throws JsonProcessingException {
        System.out.println(words.toString());

        String content = "\\nDictionary:\\n";
        for (Map.Entry<String, String> entry : words.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            content = content + key + " : " + value + ",\\n";
        }
        content = content + "\\n";
        String question = "Tôi có 1 dictionary trong đó mỗi thành phần có dạng key(String) : value(String)" +
                content +
                "Yêu cầu: \\n" +
                "Dịch các value của dictionary trên từ " + language1 + " sang " + language2 + " và không bao gồm phiên âm\\n" +
                "key và value được bao quanh bởi dấu ngoặc kép \\n " +
                "Trả lại đầy đủ số lượng ban đầu \\n" +
                "Câu trả lời bắt đầu và kết thúc bằng cặp dấu {} và chỉ được phép bao gồm key, value và các kí tự đặc biệt \\n" +
                "Tôi chỉ cần trả lại cho tôi duy nhất dictionary dưới dạng json sau khi đã dịch và không cần lời dẫn mỡ đầu hay lời dẫn kết thúc nào.";
        String resp = GetResp(question);
        System.out.println(resp);
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            words = objectMapper.readValue(resp, new TypeReference<Map<String, String>>() {});
        }
        catch (Exception e){

        }
        System.out.println(words.toString());
        return words;
    }
    public String Translate(String words, String language1, String language2) throws JsonProcessingException {
        System.out.println(words.toString());

        String content = "";
        content = content + words;
        content = content + "\\n";
        String question = "Tôi có 1 đoạn text: \\n" +
                content +
                "Yêu cầu: \\n" +
                "Dịch đoạn text trên từ " + language1 + " sang " + language2 + " và không bao gồm phiên âm\\n" +
                "Đoạn text không bao gồm kí tự đặc biệt nào\\n" +
                "Tôi chỉ cần trả lại cho tôi duy nhất nội dung đoạn text sau khi đã dịch và không cần lời dẫn mỡ đầu hay lời dẫn kết thúc nào.";
        String resp = GetResp(question);
        System.out.println(resp);
        try{
            words = resp;
        }
        catch (Exception e){

        }
        System.out.println(words.toString());
        return words;
    }
}
