package com.poketools.dto;

import java.util.List;
import java.util.Map;

//respuesta con datos de un pokemon traido de pokeapi
public class PokemonSearchResponse {
    private String name;
    private String spriteUrl;
    private List<String> types;
    private Map<String, Integer> stats;

    public PokemonSearchResponse() {
    }

    public PokemonSearchResponse(String name, String spriteUrl, List<String> types, Map<String, Integer> stats) {
        this.name = name;
        this.spriteUrl = spriteUrl;
        this.types = types;
        this.stats = stats;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpriteUrl() {
        return spriteUrl;
    }

    public void setSpriteUrl(String spriteUrl) {
        this.spriteUrl = spriteUrl;
    }

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public Map<String, Integer> getStats() {
        return stats;
    }

    public void setStats(Map<String, Integer> stats) {
        this.stats = stats;
    }
}
