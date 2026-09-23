package com.poketools.controller;

import com.poketools.dto.AdventureValidationRequest;
import com.poketools.exception.InvalidAdventureException;
import com.poketools.service.NuzlockeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//controlador para validar aventuras nuzlocke antes de guardarlas en supabase
@RestController
@RequestMapping("/api/nuzlocke")
public class NuzlockeController {

    private final NuzlockeService nuzlockeService;

    public NuzlockeController(NuzlockeService nuzlockeService) {
        this.nuzlockeService = nuzlockeService;
    }

    //valida los datos de la aventura, regresa 200 si pasa o 400 si falla
    @PostMapping("/validate")
    public ResponseEntity<String> validate(@RequestBody AdventureValidationRequest request) {
        try {
            nuzlockeService.validateAdventure(request);
            return ResponseEntity.ok("Aventura valida");
        } catch (InvalidAdventureException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
