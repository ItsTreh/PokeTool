package com.poketools.dto;

//representa una version de juego para poblar dropdowns en el frontend
public class GameVersionResponse {
    //nombre del enum, ej. FIRE_RED
    private String id;
    //nombre legible para mostrar en la UI, ej. Pokemon Rojo Fuego
    private String displayName;

    public GameVersionResponse() {
    }

    public GameVersionResponse(String id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
