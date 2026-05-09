package com.example.automata.dto;

public class SimulationComparisonDto {
    private AutomatonSimulationDto afnd;
    private AutomatonSimulationDto dfa;
    private AutomatonSimulationDto minimized;
    private boolean consistent;

    public SimulationComparisonDto() {
    }

    public SimulationComparisonDto(AutomatonSimulationDto afnd, AutomatonSimulationDto dfa, AutomatonSimulationDto minimized, boolean consistent) {
        this.afnd = afnd;
        this.dfa = dfa;
        this.minimized = minimized;
        this.consistent = consistent;
    }

    public AutomatonSimulationDto getAfnd() {
        return afnd;
    }

    public void setAfnd(AutomatonSimulationDto afnd) {
        this.afnd = afnd;
    }

    public AutomatonSimulationDto getDfa() {
        return dfa;
    }

    public void setDfa(AutomatonSimulationDto dfa) {
        this.dfa = dfa;
    }

    public AutomatonSimulationDto getMinimized() {
        return minimized;
    }

    public void setMinimized(AutomatonSimulationDto minimized) {
        this.minimized = minimized;
    }

    public boolean isConsistent() {
        return consistent;
    }

    public void setConsistent(boolean consistent) {
        this.consistent = consistent;
    }
}
