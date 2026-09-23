package com.poketools.domain.nuzlocke;

import com.poketools.enums.Gender;

import java.util.List;

//pokemon que ya fue capturado en una aventura nuzlocke
public class CaughtPokemon extends Pokemon {
    private String nickname;
    private boolean shiny;
    private Gender gender;
    private int level;
    private String notes;

    public CaughtPokemon(String name, String spriteUrl, List<String> types,
                         String nickname, boolean shiny, Gender gender, int level, String notes) {
        super(name, spriteUrl, types);
        this.nickname = nickname;
        this.shiny = shiny;
        this.gender = gender;
        this.level = level;
        this.notes = notes;
    }

    @Override
    public String getDescription() {
        return "CaughtPokemon{nickname=" + nickname + "}";
    }

    public String getNickname() {
        return nickname;
    }

    public boolean isShiny() {
        return shiny;
    }

    public Gender getGender() {
        return gender;
    }

    public int getLevel() {
        return level;
    }

    public String getNotes() {
        return notes;
    }

    @Override
    public String toString() {
        return "CaughtPokemon{name=" + name + ", nickname=" + nickname + ", shiny=" + shiny + ", level=" + level + "}";
    }
}
