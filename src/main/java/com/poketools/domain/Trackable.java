package com.poketools.domain;

//interface para cosas que se pueden rastrear en el tiempo
public interface Trackable {
    String getSummary();
    boolean isActive();
}
