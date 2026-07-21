package com.sabir.twitchbackend.game;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IGDBGame {
    private Long id;
    private String name;

    @JsonProperty("first_release_date")
    private Long firstReleaseDate;

    private Double rating;
    private String summary;
    private String storyline;

    private Cover cover;
    private List<IGBDScreenshot> screenshots;
}

@Getter
@Setter
@NoArgsConstructor
class Cover {
    private String url;
}

@Getter
@Setter
@NoArgsConstructor
class IGBDScreenshot {
    private String url;
}