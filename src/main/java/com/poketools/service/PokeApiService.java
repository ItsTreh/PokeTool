package com.poketools.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.poketools.dto.ItemSearchResponse;
import com.poketools.dto.MoveSearchResponse;
import com.poketools.dto.PokemonSearchResponse;
import com.poketools.exception.PokemonNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//servicio que actua como proxy hacia pokeapi
@Service
public class PokeApiService {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public PokeApiService(@Value("${pokeapi.base-url}") String baseUrl) {
        this.restTemplate = new RestTemplate();
        this.baseUrl = baseUrl;
    }

    //busca un pokemon por nombre en pokeapi y regresa el response mapeado
    public PokemonSearchResponse searchPokemon(String name) {
        String url = baseUrl + "/pokemon/" + name.toLowerCase();
        JsonNode data;

        try {
            data = restTemplate.getForObject(url, JsonNode.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new PokemonNotFoundException(name);
        }

        if (data == null) {
            throw new PokemonNotFoundException(name);
        }

        //el nombre oficial viene en el campo name
        String pokemonName = data.get("name").asText();

        //el sprite esta en sprites.front_default
        String spriteUrl = data.get("sprites").get("front_default").asText();

        //los tipos estan en el array types, cada elemento tiene type.name
        List<String> types = new ArrayList<>();
        for (JsonNode typeEntry : data.get("types")) {
            types.add(typeEntry.get("type").get("name").asText());
        }

        //los stats estan en el array stats, cada elemento tiene base_stat y stat.name
        Map<String, Integer> stats = new HashMap<>();
        for (JsonNode statEntry : data.get("stats")) {
            String statName = statEntry.get("stat").get("name").asText();
            int baseStat = statEntry.get("base_stat").asInt();
            stats.put(statName, baseStat);
        }

        return new PokemonSearchResponse(pokemonName, spriteUrl, types, stats);
    }

    //busca un movimiento por nombre en pokeapi
    public MoveSearchResponse searchMove(String name) {
        String url = baseUrl + "/move/" + name.toLowerCase();
        JsonNode data;

        try {
            data = restTemplate.getForObject(url, JsonNode.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new PokemonNotFoundException(name);
        }

        if (data == null) {
            throw new PokemonNotFoundException(name);
        }

        String moveName = data.get("name").asText();

        //el tipo del movimiento esta en type.name
        String type = data.get("type").get("name").asText();

        int pp = data.get("pp").asInt();

        //power puede ser null para movimientos que no hacen dano directo
        int power = data.get("power").isNull() ? 0 : data.get("power").asInt();

        //la clase de dano esta en damage_class.name
        String damageClass = data.get("damage_class").get("name").asText();

        return new MoveSearchResponse(moveName, type, pp, power, damageClass);
    }

    //busca un objeto por nombre en pokeapi
    public ItemSearchResponse searchItem(String name) {
        String url = baseUrl + "/item/" + name.toLowerCase();
        JsonNode data;

        try {
            data = restTemplate.getForObject(url, JsonNode.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new PokemonNotFoundException(name);
        }

        if (data == null) {
            throw new PokemonNotFoundException(name);
        }

        String itemName = data.get("name").asText();

        //el sprite del item esta en sprites.default
        String spriteUrl = data.get("sprites").get("default").asText();

        //el efecto esta en effect_entries, buscamos el que sea en ingles
        String effect = "";
        for (JsonNode entry : data.get("effect_entries")) {
            if (entry.get("language").get("name").asText().equals("en")) {
                effect = entry.get("short_effect").asText();
                break;
            }
        }

        return new ItemSearchResponse(itemName, spriteUrl, effect);
    }
}
