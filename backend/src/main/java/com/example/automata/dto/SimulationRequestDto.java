package com.example.automata.dto;

public class SimulationRequestDto {
    private AutomatonRequestDto automaton;
    private String input;

    public SimulationRequestDto() {
    }

    public AutomatonRequestDto getAutomaton() {
        return automaton;
    }

    public void setAutomaton(AutomatonRequestDto automaton) {
        this.automaton = automaton;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }
}
