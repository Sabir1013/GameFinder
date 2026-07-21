package com.sabir.twitchbackend.game;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class IGDBMapper {
    public Game convert(IGDBGame gameToConvert) {
        Game game = new Game();

        game = new Game(
            gameToConvert.getId(),
            gameToConvert.getName(),
            gameToConvert.getFirstReleaseDate(),
            gameToConvert.getRating(),
            gameToConvert.getCover().getUrl(),
            gameToConvert.getSummary(),
            gameToConvert.getStoryline(),
            new ArrayList<>()
        );

        game.setScreenshots(toScreenshots(gameToConvert.getScreenshots(), game));

        return game;
    }

    public List<Game> convert(List<IGDBGame> gamesToConvert) {
        return gamesToConvert.stream().map(this::convert).toList();
    }

    private List<Screenshot> toScreenshots(List<IGBDScreenshot> IGBDscreenshots, Game whichGame) {
        List<Screenshot> screenshots = new ArrayList<>();
        
        if (IGBDscreenshots != null) {
            IGBDscreenshots.forEach(s -> {
                Screenshot screenshot = new Screenshot();
                screenshot.setUrl(s.getUrl());
                screenshot.setGame(whichGame);
                screenshots.add(screenshot);
            });
        }

        return screenshots;
    }
}