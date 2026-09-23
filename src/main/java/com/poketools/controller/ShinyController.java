package com.poketools.controller;

import com.poketools.dto.PokemonSearchResponse;
import com.poketools.dto.ShinyCalculateRequest;
import com.poketools.dto.ShinyCalculateResponse;
import com.poketools.service.PokeApiService;
import com.poketools.service.ShinyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//controlador para calculos de shiny y busqueda de pokemon en ese contexto
@RestController
@RequestMapping("/api/shiny")
public class ShinyController {

    private final ShinyService shinyService;
    private final PokeApiService pokeApiService;

    public ShinyController(ShinyService shinyService, PokeApiService pokeApiService) {
        this.shinyService = shinyService;
        this.pokeApiService = pokeApiService;
    }

    //calcula la probabilidad acumulada de encontrar un shiny con los parametros dados
    @PostMapping("/calculate")
    public ResponseEntity<ShinyCalculateResponse> calculate(@RequestBody ShinyCalculateRequest request) {
        ShinyCalculateResponse response = shinyService.calculate(request);
        return ResponseEntity.ok(response);
    }

    //busca datos del pokemon objetivo para mostrar en el modulo shiny
    @GetMapping("/pokemon")
    public ResponseEntity<PokemonSearchResponse> getPokemon(@RequestParam String name) {
        PokemonSearchResponse response = pokeApiService.searchPokemon(name);
        return ResponseEntity.ok(response);
    }
}
