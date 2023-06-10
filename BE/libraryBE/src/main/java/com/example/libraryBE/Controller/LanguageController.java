package com.example.libraryBE.Controller;

import com.example.libraryBE.GPT.GPT;
import com.example.libraryBE.Model.Translate;
import com.example.libraryBE.Repository.TranslateRepository;
import com.example.libraryBE.Translate.Language;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;


@AllArgsConstructor
@ToString
@Getter
@Setter
class LanguageForm{
    String name;
    String code;
}
@CrossOrigin
@RestController
@RequestMapping("/api/language")
@RequiredArgsConstructor
public class LanguageController {

    @Autowired
    private TranslateRepository translateRepository;
    @GetMapping("/list")
    public List<LanguageForm> Languages() throws IOException {
        List<Language> languages = Arrays.asList(Language.values());
        List<LanguageForm> languageFormList = new ArrayList<>();
        for (Language language: languages){
            if(language.name().equals("NONE"))
                continue;
            languageFormList.add(new LanguageForm(language.name(), language.getCode()));
        }

        return languageFormList;
    }

    @PostMapping("/translate")
    public Map<String, String> translate(
            @RequestBody Map<String, Object> body
    ) throws JsonProcessingException {
        Map<String, String> words = (Map<String, String>) body.get("words");
        String languageName = (String) body.get("language");
        Language language = Language.VIETNAMESE;
        List<Language> languages = Arrays.asList(Language.values());
        for (Language x: languages){
            if (x.name().equals(languageName)){
                language = x;
            }
        }
        Map<String, String> newWords = new HashMap<String, String>();
        for (Map.Entry<String, String> entry : words.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            List<Translate> translates = translateRepository.findByBodyAndLanguages(key, language.name());
            if(translates.size() == 0){
                newWords.put(key, value);
            }else{
//                System.out.println("passssssss");
//                System.out.println(translates.toString());
                words.put(key, translates.get(0).getBodyTranslate());
            }
        }
//        words = GPT.Translate(words, Language.ENGLISH.name(), language.name());
//        System.out.println(words.toString());

        if(newWords.size() > 0){
            newWords = GPT.Translate(newWords, Language.ENGLISH.name(), language.name());
        }
        System.out.println(newWords.toString());
        for (Map.Entry<String, String> entry : newWords.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue().substring(0, 1).toUpperCase() + entry.getValue().substring(1).toLowerCase();
            words.put(key, value);
            translateRepository.save(new Translate(key, value, language.name()));
        }
//        List<String> keys = new ArrayList<>();
//        List<String> values = new ArrayList<>();
//        String values = "";

//        System.out.println(GPT.Translate(words, Language.ENGLISH.name(), language.name()));
//        for (Map.Entry<String, String> entry : words.entrySet()) {
//            String key = entry.getKey();
//            String value = entry.getValue();
//            value = Translator.translate(Language.ENGLISH, language, value);
//            value = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
//            words.put(key, value);
////            keys.add(key);
////            values.add(value);
////            values = values + value + " ; ";
//        }
//        for(int i = 0; i < keys.size(); i++){
//            words.put(keys.get(i),Translator.translate(Language.ENGLISH, language, values.get(i)));
//        }

//        System.out.println(values);
//        values = Translator.translate(Language.ENGLISH, language, values);

//        values = values.replaceAll("[^\\p{L}\\p{N}\\s]+", ",");
//        System.out.println(values);


//        String[] parts = values.split(",\\s*");
//        List<String> valueList = new ArrayList<>(Arrays.asList(parts));
//        valueList.removeIf(String::isEmpty);
//        for(int i = 0; i< Math.min(keys.size(), valueList.size()); i++){
//            System.out.println(keys.get(i) + ":" + valueList.get(i));
//            String value = valueList.get(i);
//            value = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
//            words.put(keys.get(i), value);
//        }
//        for(int i = Math.min(keys.size(), valueList.size()); i < Math.max(keys.size(), valueList.size()); i++){
//            words.put(keys.get(i), Translator.translate(Language.ENGLISH, language, words.get(keys.get(i))));
//        }
        return words;
    }
    @PostMapping("/translate_text")
    public String translate_text(
            @RequestBody Map<String, Object> body
    ) throws JsonProcessingException {
        System.out.println("passsssss");
        String words = (String) body.get("words");
        System.out.println(words);
        String languageName = (String) body.get("language");
        Language language = Language.VIETNAMESE;
        List<Language> languages = Arrays.asList(Language.values());
        for (Language x: languages){
            if (x.name().equals(languageName)){
                language = x;
            }
        }
        words = GPT.Translate(words, Language.ENGLISH.name(), language.name());
        return words;
    }
}
