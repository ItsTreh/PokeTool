package com.poketools.domain.nuzlocke;

//movimiento de pokemon con sus datos de pokeapi
public class Move {
    private String name;
    private String type;
    private int pp;
    private int power;
    private String damageClass;

    public Move(String name, String type, int pp, int power, String damageClass) {
        this.name = name;
        this.type = type;
        this.pp = pp;
        this.power = power;
        this.damageClass = damageClass;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public int getPp() {
        return pp;
    }

    public int getPower() {
        return power;
    }

    public String getDamageClass() {
        return damageClass;
    }

    @Override
    public String toString() {
        return "Move{name=" + name + ", type=" + type + ", pp=" + pp + ", power=" + power + "}";
    }
}
