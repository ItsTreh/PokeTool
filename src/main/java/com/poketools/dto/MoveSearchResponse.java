package com.poketools.dto;

//respuesta con datos de un movimiento traido de pokeapi
public class MoveSearchResponse {
    private String name;
    private String type;
    private int pp;
    private int power;
    private String damageClass;

    public MoveSearchResponse() {
    }

    public MoveSearchResponse(String name, String type, int pp, int power, String damageClass) {
        this.name = name;
        this.type = type;
        this.pp = pp;
        this.power = power;
        this.damageClass = damageClass;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPp() {
        return pp;
    }

    public void setPp(int pp) {
        this.pp = pp;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public String getDamageClass() {
        return damageClass;
    }

    public void setDamageClass(String damageClass) {
        this.damageClass = damageClass;
    }
}
