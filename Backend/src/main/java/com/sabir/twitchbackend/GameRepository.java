package com.sabir.twitchbackend;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sabir.twitchbackend.game.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
    Page<Game> findByNameContainingIgnoreCaseOrderByNameAsc(String query, Pageable pageable);

    @Query(value = "SELECT * FROM games ORDER BY RANDOM() LIMIT 24", nativeQuery = true)
    List<Game> findRandomGames();
}