package com.poketools.enums;

//versiones de juego que soporta el nuzlocke tracker con su nombre legible para el frontend
public enum GameVersion {
    RED("Pokemon Rojo"),
    BLUE("Pokemon Azul"),
    YELLOW("Pokemon Amarillo"),
    GOLD("Pokemon Oro"),
    SILVER("Pokemon Plata"),
    CRYSTAL("Pokemon Cristal"),
    RUBY("Pokemon Rubi"),
    SAPPHIRE("Pokemon Zafiro"),
    EMERALD("Pokemon Esmeralda"),
    FIRE_RED("Pokemon Rojo Fuego"),
    LEAF_GREEN("Pokemon Verde Hoja"),
    DIAMOND("Pokemon Diamante"),
    PEARL("Pokemon Perla"),
    PLATINUM("Pokemon Platino"),
    HEART_GOLD("Pokemon HeartGold"),
    SOUL_SILVER("Pokemon SoulSilver"),
    BLACK("Pokemon Negro"),
    WHITE("Pokemon Blanco"),
    BLACK2("Pokemon Negro 2"),
    WHITE2("Pokemon Blanco 2"),
    X("Pokemon X"),
    Y("Pokemon Y"),
    OMEGA_RUBY("Pokemon Rubi Omega"),
    ALPHA_SAPPHIRE("Pokemon Zafiro Alfa"),
    SUN("Pokemon Sol"),
    MOON("Pokemon Luna"),
    ULTRA_SUN("Pokemon Ultrasol"),
    ULTRA_MOON("Pokemon Ultraluna"),
    SWORD("Pokemon Espada"),
    SHIELD("Pokemon Escudo"),
    SCARLET("Pokemon Escarlata"),
    VIOLET("Pokemon Violeta");

    private final String displayName;

    GameVersion(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
