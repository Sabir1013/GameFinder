package com.sabir.twitchbackend;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sabir.twitchbackend.game.Game;
import com.sabir.twitchbackend.game.GameImporter;

@RestController
@RequestMapping("/api/games")
public class IGDBController {
    private final GameImporter importer;
    private final GameRepository repository;

    @Value("${spring.populate.database}")
    private boolean populate;

    public IGDBController(IGDBService requester, GameImporter importer, GameRepository repository) {
        this.importer = importer;
        this.repository = repository;
    }

    @GetMapping("/search")
    public Slice<Game> searchGames(@RequestParam String query, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 25);
        return repository.searchGames(query, pageable);
    }

    @GetMapping("/filter")
    public Slice<Game> searchFilteredGames(@RequestParam String query, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 25);
        return repository.searchFilteredGames(query, pageable);
    }

    @GetMapping("/randomize")
    public List<Game> searchRandomGames() {
        return repository.findRandomGames();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }
    

    @GetMapping("/populate")
    public void populateDatabase() {
        if (populate) {
            importer.importAllGames();
            System.out.println("Finished");
        } else {
            return;
        }
    }
}