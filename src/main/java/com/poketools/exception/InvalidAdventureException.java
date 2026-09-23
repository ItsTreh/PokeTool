package com.poketools.exception;

//cuando los datos de una aventura no pasan la validacion
public class InvalidAdventureException extends RuntimeException {

    public InvalidAdventureException(String message) {
        super(message);
    }
}
