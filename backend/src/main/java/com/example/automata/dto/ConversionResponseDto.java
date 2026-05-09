package com.example.automata.dto;

import com.example.automata.model.Automaton;

public class ConversionResponseDto {
    private Automaton automaton;

    public ConversionResponseDto() {
    }

    public ConversionResponseDto(Automaton automaton) {
        this.automaton = automaton;
    }

    public Automaton getAutomaton() {
        return automaton;
    }

    public void setAutomaton(Automaton automaton) {
        this.automaton = automaton;
    }
}
