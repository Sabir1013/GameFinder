package com.sabir.twitchbackend;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sabir.twitchbackend.game.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
    @Query(value = "SELECT * FROM games WHERE name % :query ORDER BY (CASE WHEN LOWER(name) = LOWER(:query) THEN 1000 WHEN LOWER(name) LIKE LOWER(:query) || '%' THEN 500 WHEN LOWER(name) LIKE '%' || LOWER(:query) || '%' THEN 250 ELSE 0 END) + (similarity(name, :query) * 100) + (COALESCE(rating, 0) * 2) DESC", countQuery = "SELECT COUNT(*) FROM games WHERE name % :query", nativeQuery = true)
    Page<Game> searchGames(String query, Pageable pageable);

    @Query(value = "SELECT * FROM games ORDER BY RANDOM() LIMIT 24", nativeQuery = true)
    List<Game> findRandomGames();
}