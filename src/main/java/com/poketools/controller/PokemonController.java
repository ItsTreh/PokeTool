package com.poketools.controller;

import com.poketools.dto.PokemonSearchResponse;
import com.poketools.service.PokeApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//controlador para buscar pokemon en pokeapi
@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

    private final PokeApiService pokeApiService;

    public PokemonController(PokeApiService pokeApiService) {
        this.pokeApiService = pokeApiService;
    }

    //busca un pokemon por nombre y regresa sus datos principales
    @GetMapping("/search")
    public ResponseEntity<PokemonSearchResponse> search(@RequestParam String name) {
        PokemonSearchResponse response = pokeApiService.searchPokemon(name);
        return ResponseEntity.ok(response);
    }
}
