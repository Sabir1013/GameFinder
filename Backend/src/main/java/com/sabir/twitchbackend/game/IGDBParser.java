package com.sabir.twitchbackend.game;

import java.util.List;

import org.springframework.stereotype.Component;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Component
public class IGDBParser {
    private final ObjectMapper mapper = new ObjectMapper();

    public List<IGDBGame> parse(String json) {
        return mapper.readValue(json, new TypeReference<List<IGDBGame>>(){});
    }
}