package com.poketools.exception;

//cuando pokeapi no encuentra el pokemon pedido
public class PokemonNotFoundException extends RuntimeException {

    public PokemonNotFoundException(String name) {
        super("Pokemon no encontrado: " + name);
    }
}
