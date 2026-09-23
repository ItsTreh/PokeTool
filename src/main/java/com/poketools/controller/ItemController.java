package com.poketools.controller;

import com.poketools.dto.ItemSearchResponse;
import com.poketools.service.PokeApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//controlador para buscar objetos en pokeapi
@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final PokeApiService pokeApiService;

    public ItemController(PokeApiService pokeApiService) {
        this.pokeApiService = pokeApiService;
    }

    //busca un objeto por nombre y regresa sus datos con el efecto
    @GetMapping("/search")
    public ResponseEntity<ItemSearchResponse> search(@RequestParam String name) {
        ItemSearchResponse response = pokeApiService.searchItem(name);
        return ResponseEntity.ok(response);
    }
}
