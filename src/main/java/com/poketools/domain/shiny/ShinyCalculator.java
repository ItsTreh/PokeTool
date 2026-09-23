package com.poketools.domain.shiny;

import com.poketools.enums.Generation;

//hace los calculos de probabilidad shiny, sin estado propio
public class ShinyCalculator {

    //calcula la probabilidad acumulada dado una generacion, charm y numero de encuentros
    public double calculate(Generation generation, boolean shinyCharm, int encounters) {
        return generation.calculateProbability(shinyCharm, encounters);
    }

    //regresa los rolls efectivos por encuentro segun la generacion y si el charm aplica
    //los odds base no cambian con el charm, lo que cambia es la cantidad de rolls
    public int getEffectiveRolls(Generation generation, boolean shinyCharm) {
        return generation.getRolls(shinyCharm);
    }
}
