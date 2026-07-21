package com.sabir.twitchbackend.game;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "games")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Game {
    @Id
    private Long id;

    private String name;
    private Long releaseDate;
    private Double rating;
    private String coverUrl;

    @Column(columnDefinition = "TEXT") 
    private String summary;
    @Column(columnDefinition = "TEXT")
    private String storyline;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<Screenshot> screenshots;
}