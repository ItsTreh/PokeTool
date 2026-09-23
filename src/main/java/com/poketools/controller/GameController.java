package com.poketools.controller;

import com.poketools.dto.GameVersionResponse;
import com.poketools.enums.GameVersion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

//controlador que expone los juegos soportados para que react pueble dropdowns
@RestController
@RequestMapping("/api/games")
public class GameController {

    //regresa todos los juegos disponibles con su id y nombre legible
    @GetMapping
    public ResponseEntity<List<GameVersionResponse>> getAllGames() {
        List<GameVersionResponse> games = new ArrayList<>();

        for (GameVersion version : GameVersion.values()) {
            games.add(new GameVersionResponse(version.name(), version.getDisplayName()));
        }

        return ResponseEntity.ok(games);
    }
}
