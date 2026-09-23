package com.poketools.service;

import com.poketools.domain.shiny.ShinyCalculator;
import com.poketools.dto.ShinyCalculateRequest;
import com.poketools.dto.ShinyCalculateResponse;
import com.poketools.enums.Generation;
import org.springframework.stereotype.Service;

//orquesta el calculo de probabilidad shiny
@Service
public class ShinyService {

    //calcula la probabilidad dado una generacion, charm y numero de encuentros
    public ShinyCalculateResponse calculate(ShinyCalculateRequest request) {
        //parsear el nombre de la generacion al enum correspondiente
        Generation generation;
        try {
            generation = Generation.valueOf(request.getGenerationName());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Generacion no valida: " + request.getGenerationName());
        }

        ShinyCalculator calculator = new ShinyCalculator();

        //calcular la probabilidad acumulada con el sistema de rolls
        double probability = calculator.calculate(generation, request.isShinyCharm(), request.getEncounters());

        //obtener cuantos rolls por encuentro aplican con o sin charm
        int rolls = calculator.getEffectiveRolls(generation, request.isShinyCharm());

        return new ShinyCalculateResponse(probability, generation.getBaseOdds(), rolls, request.getEncounters());
    }
}
