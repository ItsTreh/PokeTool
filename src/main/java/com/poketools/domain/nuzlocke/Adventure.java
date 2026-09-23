package com.poketools.domain.nuzlocke;

import com.poketools.domain.Trackable;
import com.poketools.enums.GameVersion;
import com.poketools.enums.NuzlockeRule;

import java.util.ArrayList;
import java.util.List;

//aventura nuzlocke completa de un entrenador
public class Adventure implements Trackable {
    private String trainerName;
    private GameVersion game;
    private List<NuzlockeRule> rules;
    private String avatarUrl;
    private List<Route> routes;

    public Adventure(String trainerName, GameVersion game, List<NuzlockeRule> rules, String avatarUrl) {
        this.trainerName = trainerName;
        this.game = game;
        this.rules = rules;
        this.avatarUrl = avatarUrl;
        //lista de rutas empieza vacia
        this.routes = new ArrayList<>();
    }

    public void addRoute(Route r) {
        this.routes.add(r);
    }

    //activa si tiene al menos una ruta registrada
    @Override
    public boolean isActive() {
        return !routes.isEmpty();
    }

    @Override
    public String getSummary() {
        return "Adventure{trainer=" + trainerName + ", game=" + game + ", routes=" + routes.size() + "}";
    }

    public String getTrainerName() {
        return trainerName;
    }

    public GameVersion getGame() {
        return game;
    }

    public List<NuzlockeRule> getRules() {
        return rules;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    @Override
    public String toString() {
        return "Adventure{trainerName=" + trainerName + ", game=" + game + ", rules=" + rules + "}";
    }
}
