package com.poketools.domain.shiny;

import com.poketools.domain.Trackable;
import com.poketools.enums.Generation;

//sesion activa de busqueda de shiny
public class ShinySession implements Trackable {
    private String targetPokemon;
    private Generation generation;
    private boolean shinyCharm;
    private int currentEncounters;

    public ShinySession(String targetPokemon, Generation generation, boolean shinyCharm) {
        this.targetPokemon = targetPokemon;
        this.generation = generation;
        this.shinyCharm = shinyCharm;
        //empieza en cero encuentros
        this.currentEncounters = 0;
    }

    public void incrementEncounters() {
        this.currentEncounters++;
    }

    //activa si ya hubo al menos un encuentro
    @Override
    public boolean isActive() {
        return currentEncounters > 0;
    }

    @Override
    public String getSummary() {
        return "ShinySession{target=" + targetPokemon + ", encounters=" + currentEncounters + "}";
    }

    public String getTargetPokemon() {
        return targetPokemon;
    }

    public Generation getGeneration() {
        return generation;
    }

    public boolean isShinyCharm() {
        return shinyCharm;
    }

    public int getCurrentEncounters() {
        return currentEncounters;
    }

    @Override
    public String toString() {
        return "ShinySession{target=" + targetPokemon + ", generation=" + generation + ", encounters=" + currentEncounters + "}";
    }
}
