package com.poketools.dto;

//datos que manda react para calcular la probabilidad shiny
public class ShinyCalculateRequest {
    private String generationName;
    private boolean shinyCharm;
    private int encounters;

    public ShinyCalculateRequest() {
    }

    public ShinyCalculateRequest(String generationName, boolean shinyCharm, int encounters) {
        this.generationName = generationName;
        this.shinyCharm = shinyCharm;
        this.encounters = encounters;
    }

    public String getGenerationName() {
        return generationName;
    }

    public void setGenerationName(String generationName) {
        this.generationName = generationName;
    }

    public boolean isShinyCharm() {
        return shinyCharm;
    }

    public void setShinyCharm(boolean shinyCharm) {
        this.shinyCharm = shinyCharm;
    }

    public int getEncounters() {
        return encounters;
    }

    public void setEncounters(int encounters) {
        this.encounters = encounters;
    }
}
