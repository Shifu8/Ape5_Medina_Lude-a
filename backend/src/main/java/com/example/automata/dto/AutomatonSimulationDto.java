package com.example.automata.dto;

import java.util.List;

public class AutomatonSimulationDto {
    private String name;
    private String input;
    private boolean accepted;
    private List<String> initialStates;
    private List<String> path;
    private List<SimulationStepDto> steps;

    public AutomatonSimulationDto() {
    }

    public AutomatonSimulationDto(String name, String input, boolean accepted, List<String> initialStates, List<String> path, List<SimulationStepDto> steps) {
        this.name = name;
        this.input = input;
        this.accepted = accepted;
        this.initialStates = initialStates;
        this.path = path;
        this.steps = steps;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public List<String> getInitialStates() {
        return initialStates;
    }

    public void setInitialStates(List<String> initialStates) {
        this.initialStates = initialStates;
    }

    public List<String> getPath() {
        return path;
    }

    public void setPath(List<String> path) {
        this.path = path;
    }

    public List<SimulationStepDto> getSteps() {
        return steps;
    }

    public void setSteps(List<SimulationStepDto> steps) {
        this.steps = steps;
    }
}
