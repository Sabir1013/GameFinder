package com.sabir.twitchbackend;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sabir.twitchbackend.game.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
    //@Query( value = "SELECT * FROM games WHERE LOWER(name) LIKE '%' || LOWER(:query) || '%' ORDER BY LOWER(name) = LOWER(:query) DESC, rating DESC NULLS LAST", countQuery = "SELECT COUNT(*) FROM games WHERE LOWER(name) LIKE '%' || LOWER(:query) || '%'", nativeQuery = true)
    @Query(value = "SELECT * FROM games WHERE LOWER(name) LIKE '%' || LOWER(:query) || '%' ORDER BY CASE WHEN LOWER(name) = LOWER(:query) AND game_type = 0 AND rating IS NOT NULL THEN 0 WHEN LOWER(name) = LOWER(:query) AND game_type = 0 AND rating IS NULL THEN 3 WHEN LOWER(name) = LOWER(:query) THEN 1 ELSE 2 END ASC, CASE WHEN game_type = 0 AND rating IS NOT NULL THEN 0 WHEN game_type != 0 THEN 1 WHEN game_type = 0 AND rating IS NULL THEN 2 END ASC, rating DESC NULLS LAST", nativeQuery = true)
    Slice<Game> searchGames(String query, Pageable pageable);

    @Query(value = "SELECT * FROM games WHERE LOWER(name) LIKE '%' || LOWER(:query) || '%' AND game_type = 0 ORDER BY CASE WHEN LOWER(name) = LOWER(:query) AND rating IS NOT NULL THEN 0 WHEN LOWER(name) = LOWER(:query) AND rating IS NULL THEN 2 ELSE 1 END ASC, rating DESC NULLS LAST", nativeQuery = true)
    Slice<Game> searchFilteredGames(String query, Pageable pageable);

    @Query(value = "SELECT * FROM games TABLESAMPLE SYSTEM(1) WHERE game_type = 0 LIMIT 24", nativeQuery = true)
    List<Game> findRandomGames();
}