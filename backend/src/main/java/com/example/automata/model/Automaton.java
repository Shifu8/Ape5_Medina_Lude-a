package com.example.automata.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Automaton {
    private final Set<String> states;
    private final Set<String> alphabet;
    private final Set<Transition> transitions;
    private final String initialState;
    private final Set<String> finalStates;

    public Automaton(Set<String> states, Set<String> alphabet, Set<Transition> transitions, String initialState, Set<String> finalStates) {
        this.states = new HashSet<>(states);
        this.alphabet = new HashSet<>(alphabet);
        this.transitions = new HashSet<>(transitions);
        this.initialState = initialState;
        this.finalStates = new HashSet<>(finalStates);
    }

    public Set<String> getStates() {
        return states;
    }

    public Set<String> getAlphabet() {
        return alphabet;
    }

    public Set<Transition> getTransitions() {
        return transitions;
    }

    public String getInitialState() {
        return initialState;
    }

    public Set<String> getFinalStates() {
        return finalStates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Automaton automaton = (Automaton) o;
        return Objects.equals(states, automaton.states) && Objects.equals(alphabet, automaton.alphabet) && Objects.equals(transitions, automaton.transitions) && Objects.equals(initialState, automaton.initialState) && Objects.equals(finalStates, automaton.finalStates);
    }

    @Override
    public int hashCode() {
        return Objects.hash(states, alphabet, transitions, initialState, finalStates);
    }
}
