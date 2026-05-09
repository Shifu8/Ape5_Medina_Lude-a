package com.example.automata.dto;

import java.util.List;
import java.util.Set;

public class AutomatonRequestDto {
    private Set<String> states;
    private Set<String> alphabet;
    private List<TransitionDto> transitions;
    private String initialState;
    private Set<String> finalStates;

    public AutomatonRequestDto() {
    }

    public Set<String> getStates() {
        return states;
    }

    public void setStates(Set<String> states) {
        this.states = states;
    }

    public Set<String> getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(Set<String> alphabet) {
        this.alphabet = alphabet;
    }

    public List<TransitionDto> getTransitions() {
        return transitions;
    }

    public void setTransitions(List<TransitionDto> transitions) {
        this.transitions = transitions;
    }

    public String getInitialState() {
        return initialState;
    }

    public void setInitialState(String initialState) {
        this.initialState = initialState;
    }

    public Set<String> getFinalStates() {
        return finalStates;
    }

    public void setFinalStates(Set<String> finalStates) {
        this.finalStates = finalStates;
    }
}
