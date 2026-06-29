package com.sabir.twitchbackend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/igdb")
@CrossOrigin(origins = "http://localhost:5173")
public class IGDBController {
    private final IGDBService requester;
    
    public IGDBController(IGDBService requester) {
        this.requester = requester;
    }

    @GetMapping("/search")
    public String searchGames(@RequestParam String query) {
        return requester.getGames(query);
    }

    @GetMapping("/randomize")
    public String searchRandomGames() {
        return requester.getRandomGames();
    }
}