package com.example.automata.dto;

import java.util.List;

public class SimulationStepDto {
    private String symbol;
    private List<String> beforeStates;
    private List<String> afterStates;
    private List<String> transitions;
    private List<String> activeEdgeIds;

    public SimulationStepDto() {
    }

    public SimulationStepDto(String symbol, List<String> beforeStates, List<String> afterStates, List<String> transitions, List<String> activeEdgeIds) {
        this.symbol = symbol;
        this.beforeStates = beforeStates;
        this.afterStates = afterStates;
        this.transitions = transitions;
        this.activeEdgeIds = activeEdgeIds;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public List<String> getBeforeStates() {
        return beforeStates;
    }

    public void setBeforeStates(List<String> beforeStates) {
        this.beforeStates = beforeStates;
    }

    public List<String> getAfterStates() {
        return afterStates;
    }

    public void setAfterStates(List<String> afterStates) {
        this.afterStates = afterStates;
    }

    public List<String> getTransitions() {
        return transitions;
    }

    public void setTransitions(List<String> transitions) {
        this.transitions = transitions;
    }

    public List<String> getActiveEdgeIds() {
        return activeEdgeIds;
    }

    public void setActiveEdgeIds(List<String> activeEdgeIds) {
        this.activeEdgeIds = activeEdgeIds;
    }
}
