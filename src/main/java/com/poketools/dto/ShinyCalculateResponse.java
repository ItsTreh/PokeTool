package com.poketools.dto;

//resultado del calculo de probabilidad shiny que se manda al frontend
//rolls indica cuantos intentos por encuentro aplican (1 sin charm, 3 con charm en gen 6+)
public class ShinyCalculateResponse {
    private double probability;
    private int baseOdds;
    //rolls por encuentro segun si el charm aplica y la generacion lo soporta
    private int rolls;
    private int encounters;

    public ShinyCalculateResponse() {
    }

    public ShinyCalculateResponse(double probability, int baseOdds, int rolls, int encounters) {
        this.probability = probability;
        this.baseOdds = baseOdds;
        this.rolls = rolls;
        this.encounters = encounters;
    }

    public double getProbability() {
        return probability;
    }

    public void setProbability(double probability) {
        this.probability = probability;
    }

    public int getBaseOdds() {
        return baseOdds;
    }

    public void setBaseOdds(int baseOdds) {
        this.baseOdds = baseOdds;
    }

    public int getRolls() {
        return rolls;
    }

    public void setRolls(int rolls) {
        this.rolls = rolls;
    }

    public int getEncounters() {
        return encounters;
    }

    public void setEncounters(int encounters) {
        this.encounters = encounters;
    }
}
