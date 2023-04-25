package com.zkiss.proman.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class SessionService {
    private Map<String, UUID> session = new HashMap<>();
    public void put(String key, UUID id){
        session.put(key, id);
    }

    public UUID get(String key){
        return session.get(key);
    }
    public void clear(){
        session.clear();
    }
}
