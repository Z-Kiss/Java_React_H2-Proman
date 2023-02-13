package com.zkiss.proman.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SessionService {

    private Map<String, Long> session = new HashMap<>();

    public void put(String key, Long id){
        session.put(key, id);
    }

    public Long get(String key){
        return session.get(key);
    }

    public void clear(){
        session.clear();
    }
}
