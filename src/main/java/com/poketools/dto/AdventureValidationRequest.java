package com.poketools.dto;

import java.util.List;

//datos principales de una aventura que java valida antes de que react la guarde en supabase
//la validacion es superficial: solo verifica trainerName, game y rules
//la validacion de rutas y pokemon capturados la maneja supabase directamente
public class AdventureValidationRequest {
    private String trainerName;
    private String game;
    private List<String> rules;

    public AdventureValidationRequest() {
    }

    public AdventureValidationRequest(String trainerName, String game, List<String> rules) {
        this.trainerName = trainerName;
        this.game = game;
        this.rules = rules;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public List<String> getRules() {
        return rules;
    }

    public void setRules(List<String> rules) {
        this.rules = rules;
    }
}
