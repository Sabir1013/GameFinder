package com.sabir.twitchbackend.game;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sabir.twitchbackend.GameRepository;
import com.sabir.twitchbackend.IGDBService;

@Service
public class GameImporter {

    private final IGDBService igdbService;
    private final IGDBParser parser;
    private final IGDBMapper mapper;
    private final GameRepository repository;

    public GameImporter(
            IGDBService igdbService,
            IGDBParser parser,
            IGDBMapper mapper,
            GameRepository repository) {
        this.igdbService = igdbService;
        this.parser = parser;
        this.mapper = mapper;
        this.repository = repository;
    }

    public void importAllGames() {
        int offset = 0;

        while (true) {
            String json = igdbService.getGamesPage(offset);

            List<IGDBGame> igdbGames = new ArrayList<>(parser.parse(json));
            json = null;

            if (igdbGames.isEmpty()) {
                break;
            }

            List<Game> games = new ArrayList<>(mapper.convert(igdbGames));

            repository.saveAll(games);

            igdbGames.clear();
            games.clear();

            offset += 100;

            System.out.println(offset);
        }
    }
}