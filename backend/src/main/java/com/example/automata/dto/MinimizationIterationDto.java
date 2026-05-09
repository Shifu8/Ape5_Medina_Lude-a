package com.example.automata.dto;

import java.util.List;

public class MinimizationIterationDto {
    private int iteration;
    private List<StatePairDto> pairs;
    private List<StatePairDto> newlyMarkedPairs;

    public MinimizationIterationDto() {
    }

    public MinimizationIterationDto(int iteration, List<StatePairDto> pairs, List<StatePairDto> newlyMarkedPairs) {
        this.iteration = iteration;
        this.pairs = pairs;
        this.newlyMarkedPairs = newlyMarkedPairs;
    }

    public int getIteration() {
        return iteration;
    }

    public void setIteration(int iteration) {
        this.iteration = iteration;
    }

    public List<StatePairDto> getPairs() {
        return pairs;
    }

    public void setPairs(List<StatePairDto> pairs) {
        this.pairs = pairs;
    }

    public List<StatePairDto> getNewlyMarkedPairs() {
        return newlyMarkedPairs;
    }

    public void setNewlyMarkedPairs(List<StatePairDto> newlyMarkedPairs) {
        this.newlyMarkedPairs = newlyMarkedPairs;
    }
}
