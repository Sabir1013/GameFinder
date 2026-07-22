package com.sabir.twitchbackend;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pgvector.PGvector;
import com.sabir.twitchbackend.ai.AIService;
import com.sabir.twitchbackend.game.Game;
import com.sabir.twitchbackend.game.GameImporter;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:5173")
public class IGDBController {
    private final GameImporter importer;
    private final GameRepository repository;
    private final AIService aiService;

    public IGDBController(IGDBService requester, GameImporter importer, GameRepository repository, AIService aiService) {
        this.importer = importer;
        this.repository = repository;
        this.aiService = aiService;
    }

    @GetMapping("/search")
    public Page<Game> searchGames(@RequestParam String query, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 25);
        PGvector embedding = aiService.getEmbedding(query);
        return repository.searchGames(query, embedding.toString(), pageable);
    }

    @GetMapping("/randomize")
    public List<Game> searchRandomGames() {
        return repository.findRandomGames();
    }

    @GetMapping("/test-import")
    public void testImport() {
        importer.importAllGames();
        System.out.println("Done!");
    }
}