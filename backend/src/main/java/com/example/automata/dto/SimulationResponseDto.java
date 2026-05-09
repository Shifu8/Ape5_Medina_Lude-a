package com.example.automata.dto;

import java.util.List;

public class SimulationResponseDto {
    private boolean accepted;
    private List<String> visitedStates;
    private String input;

    public SimulationResponseDto() {
    }

    public SimulationResponseDto(boolean accepted, List<String> visitedStates, String input) {
        this.accepted = accepted;
        this.visitedStates = visitedStates;
        this.input = input;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public List<String> getVisitedStates() {
        return visitedStates;
    }

    public void setVisitedStates(List<String> visitedStates) {
        this.visitedStates = visitedStates;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }
}
