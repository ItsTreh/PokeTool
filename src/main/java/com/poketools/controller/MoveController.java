package com.poketools.controller;

import com.poketools.dto.MoveSearchResponse;
import com.poketools.service.PokeApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//controlador para buscar movimientos en pokeapi
@RestController
@RequestMapping("/api/moves")
public class MoveController {

    private final PokeApiService pokeApiService;

    public MoveController(PokeApiService pokeApiService) {
        this.pokeApiService = pokeApiService;
    }

    //busca un movimiento por nombre y regresa sus datos
    @GetMapping("/search")
    public ResponseEntity<MoveSearchResponse> search(@RequestParam String name) {
        MoveSearchResponse response = pokeApiService.searchMove(name);
        return ResponseEntity.ok(response);
    }
}
