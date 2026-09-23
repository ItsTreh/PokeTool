package com.poketools.service;

import com.poketools.dto.AdventureValidationRequest;
import com.poketools.enums.GameVersion;
import com.poketools.exception.InvalidAdventureException;
import org.springframework.stereotype.Service;

//valida los datos de una aventura nuzlocke antes de que react la guarde en supabase
@Service
public class NuzlockeService {

    //valida que la aventura tenga datos minimos correctos
    public void validateAdventure(AdventureValidationRequest request) {
        //validar que el nombre del entrenador no venga vacio
        if (request.getTrainerName() == null || request.getTrainerName().isBlank()) {
            throw new InvalidAdventureException("El nombre del entrenador es obligatorio");
        }

        //validar que el juego corresponda a un GameVersion valido
        try {
            GameVersion.valueOf(request.getGame());
        } catch (IllegalArgumentException e) {
            throw new InvalidAdventureException("Juego no valido: " + request.getGame());
        }

        //las reglas pueden ser lista vacia pero no null
        if (request.getRules() == null) {
            throw new InvalidAdventureException("La lista de reglas no puede ser null");
        }
    }
}
