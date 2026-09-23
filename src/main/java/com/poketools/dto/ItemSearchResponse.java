package com.poketools.dto;

//respuesta con datos de un objeto traido de pokeapi
public class ItemSearchResponse {
    private String name;
    private String spriteUrl;
    private String effect;

    public ItemSearchResponse() {
    }

    public ItemSearchResponse(String name, String spriteUrl, String effect) {
        this.name = name;
        this.spriteUrl = spriteUrl;
        this.effect = effect;
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

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }
}
