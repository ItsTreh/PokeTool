package com.poketools.enums;

//generacion del juego con su sistema de rolls para calcular shinies
public enum Generation {
    //gen 1-5: el shiny charm no existe, siempre 1 roll por encuentro
    GEN_1(1, 8192, false, 1, 1),
    GEN_2(2, 8192, false, 1, 1),
    GEN_3(3, 8192, false, 1, 1),
    GEN_4(4, 8192, false, 1, 1),
    GEN_5(5, 8192, false, 1, 1),
    //gen 6+: sin charm = 1 roll, con charm = 3 rolls por encuentro
    GEN_6(6, 4096, true, 1, 3),
    GEN_7(7, 4096, true, 1, 3),
    GEN_8(8, 4096, true, 1, 3),
    GEN_9(9, 4096, true, 1, 3);

    private final int number;
    private final int baseOdds;
    //indica si el shiny charm existe en esta generacion
    private final boolean charmAvailable;
    //rolls por encuentro sin charm
    private final int rollsBase;
    //rolls por encuentro con charm
    private final int rollsWithCharm;

    Generation(int number, int baseOdds, boolean charmAvailable, int rollsBase, int rollsWithCharm) {
        this.number = number;
        this.baseOdds = baseOdds;
        this.charmAvailable = charmAvailable;
        this.rollsBase = rollsBase;
        this.rollsWithCharm = rollsWithCharm;
    }

    //resuelve cuantos rolls aplican segun si el charm existe en esta gen y si el jugador lo tiene
    private int resolveRolls(boolean shinyCharm) {
        //en gen 1-5 el charm no existe, siempre se usa rollsBase
        if (!charmAvailable) {
            return rollsBase;
        }
        return shinyCharm ? rollsWithCharm : rollsBase;
    }

    //calcula la probabilidad acumulada usando el sistema de rolls real del juego
    //cada encuentro da R rolls independientes, el pokemon es shiny si al menos uno acierta
    //preparado para recibir rolls adicionales en el futuro sin romper la firma actual
    public double calculateProbability(boolean shinyCharm, int encounters) {
        int rolls = resolveRolls(shinyCharm);
        //probabilidad de NO ser shiny en un solo roll
        double notShinyPerRoll = (double)(baseOdds - 1) / baseOdds;
        //probabilidad de NO ser shiny en un encuentro completo (todos los rolls fallan)
        double notShinyPerEncounter = Math.pow(notShinyPerRoll, rolls);
        //probabilidad acumulada de al menos un shiny en N encuentros
        return 1 - Math.pow(notShinyPerEncounter, encounters);
    }

    //regresa los rolls efectivos por encuentro segun si el charm aplica
    public int getRolls(boolean shinyCharm) {
        return resolveRolls(shinyCharm);
    }

    public int getNumber() {
        return number;
    }

    public int getBaseOdds() {
        return baseOdds;
    }

    public boolean isCharmAvailable() {
        return charmAvailable;
    }
}
