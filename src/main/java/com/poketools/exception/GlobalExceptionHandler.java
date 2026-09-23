package com.poketools.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//maneja todas las excepciones del backend de forma centralizada
@RestControllerAdvice
public class GlobalExceptionHandler {

    //atrapa PokemonNotFoundException y regresa 404
    @ExceptionHandler(PokemonNotFoundException.class)
    public ResponseEntity<String> handleNotFound(PokemonNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    //atrapa InvalidAdventureException y regresa 400
    @ExceptionHandler(InvalidAdventureException.class)
    public ResponseEntity<String> handleInvalidAdventure(InvalidAdventureException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    //atrapa cualquier otra excepcion no controlada y regresa 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneral(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno: " + e.getMessage());
    }
}
