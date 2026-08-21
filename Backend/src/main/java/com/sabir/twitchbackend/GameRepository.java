package com.sabir.twitchbackend;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sabir.twitchbackend.game.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
    @Query( value = "SELECT * FROM games ORDER BY LOWER(name) = LOWER(:query) DESC, rating IS NULL ASC, rating DESC", countQuery = "SELECT COUNT(*) FROM games", nativeQuery = true )    
    Page<Game> searchGames(String query, Pageable pageable);

    @Query(value = "SELECT * FROM games ORDER BY RANDOM() LIMIT 24", nativeQuery = true)
    List<Game> findRandomGames();
}