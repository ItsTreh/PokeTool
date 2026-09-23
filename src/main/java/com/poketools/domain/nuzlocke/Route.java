package com.poketools.domain.nuzlocke;

import java.util.ArrayList;
import java.util.List;

//ruta del juego con los pokemon capturados en ella
public class Route {
    private String routeName;
    private List<CaughtPokemon> caughtPokemon;

    public Route(String routeName) {
        this.routeName = routeName;
        //lista vacia al crear la ruta
        this.caughtPokemon = new ArrayList<>();
    }

    public void addPokemon(CaughtPokemon p) {
        this.caughtPokemon.add(p);
    }

    public String getRouteName() {
        return routeName;
    }

    public List<CaughtPokemon> getCaughtPokemon() {
        return caughtPokemon;
    }

    @Override
    public String toString() {
        return "Route{routeName=" + routeName + ", caughtPokemon=" + caughtPokemon.size() + "}";
    }
}
