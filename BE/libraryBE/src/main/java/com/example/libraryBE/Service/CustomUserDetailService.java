package com.example.libraryBE.Service;

import com.example.libraryBE.Repository.CustomUserRepository;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Detail.CustomUserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;

public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private CustomUserRepository customUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser == null){
            throw new UsernameNotFoundException("ERROR");
        }
        return new CustomUserDetail(customUser);
    }

}
