package com.poketools.domain.nuzlocke;

//objeto del juego con su sprite de pokeapi
public class Item {
    private String name;
    private String spriteUrl;
    private String effect;

    public Item(String name, String spriteUrl, String effect) {
        this.name = name;
        this.spriteUrl = spriteUrl;
        this.effect = effect;
    }

    public String getName() {
        return name;
    }

    public String getSpriteUrl() {
        return spriteUrl;
    }

    public String getEffect() {
        return effect;
    }

    @Override
    public String toString() {
        return "Item{name=" + name + ", effect=" + effect + "}";
    }
}
