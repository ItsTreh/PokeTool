package com.poketools.domain.nuzlocke;

import java.util.List;

//clase base para todos los pokemon del proyecto
public abstract class Pokemon {
    protected String name;
    protected String spriteUrl;
    protected List<String> types;

    public Pokemon(String name, String spriteUrl, List<String> types) {
        this.name = name;
        this.spriteUrl = spriteUrl;
        this.types = types;
    }

    //cada subclase decide como se describe a si misma
    public abstract String getDescription();

    public String getName() {
        return name;
    }

    public String getSpriteUrl() {
        return spriteUrl;
    }

    public List<String> getTypes() {
        return types;
    }

    @Override
    public String toString() {
        return "Pokemon{name=" + name + ", types=" + types + "}";
    }
}
