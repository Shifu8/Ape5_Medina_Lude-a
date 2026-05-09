package com.example.automata.dto;

import com.example.automata.model.Automaton;

import java.util.List;
import java.util.Set;

public class MinimizationResultDto {
    private Set<String> originalStates;
    private Set<String> minimizedStates;
    private int originalStateCount;
    private int minimizedStateCount;
    private double reductionPercentage;
    private List<List<String>> equivalenceClasses;
    private List<MinimizationIterationDto> iterations;
    private Automaton minimizedAutomaton;

    public MinimizationResultDto() {
    }

    public MinimizationResultDto(Set<String> originalStates, Set<String> minimizedStates, int originalStateCount, int minimizedStateCount, double reductionPercentage, List<List<String>> equivalenceClasses, List<MinimizationIterationDto> iterations, Automaton minimizedAutomaton) {
        this.originalStates = originalStates;
        this.minimizedStates = minimizedStates;
        this.originalStateCount = originalStateCount;
        this.minimizedStateCount = minimizedStateCount;
        this.reductionPercentage = reductionPercentage;
        this.equivalenceClasses = equivalenceClasses;
        this.iterations = iterations;
        this.minimizedAutomaton = minimizedAutomaton;
    }

    public Set<String> getOriginalStates() {
        return originalStates;
    }

    public void setOriginalStates(Set<String> originalStates) {
        this.originalStates = originalStates;
    }

    public Set<String> getMinimizedStates() {
        return minimizedStates;
    }

    public void setMinimizedStates(Set<String> minimizedStates) {
        this.minimizedStates = minimizedStates;
    }

    public int getOriginalStateCount() {
        return originalStateCount;
    }

    public void setOriginalStateCount(int originalStateCount) {
        this.originalStateCount = originalStateCount;
    }

    public int getMinimizedStateCount() {
        return minimizedStateCount;
    }

    public void setMinimizedStateCount(int minimizedStateCount) {
        this.minimizedStateCount = minimizedStateCount;
    }

    public double getReductionPercentage() {
        return reductionPercentage;
    }

    public void setReductionPercentage(double reductionPercentage) {
        this.reductionPercentage = reductionPercentage;
    }

    public List<List<String>> getEquivalenceClasses() {
        return equivalenceClasses;
    }

    public void setEquivalenceClasses(List<List<String>> equivalenceClasses) {
        this.equivalenceClasses = equivalenceClasses;
    }

    public List<MinimizationIterationDto> getIterations() {
        return iterations;
    }

    public void setIterations(List<MinimizationIterationDto> iterations) {
        this.iterations = iterations;
    }

    public Automaton getMinimizedAutomaton() {
        return minimizedAutomaton;
    }

    public void setMinimizedAutomaton(Automaton minimizedAutomaton) {
        this.minimizedAutomaton = minimizedAutomaton;
    }
}
