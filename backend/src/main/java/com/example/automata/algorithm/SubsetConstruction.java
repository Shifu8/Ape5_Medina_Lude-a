package com.example.automata.algorithm;

import com.example.automata.model.Automaton;
import com.example.automata.model.Transition;

import java.util.*;
import java.util.stream.Collectors;

public final class SubsetConstruction {
    private static final String EPSILON = "ε";

    private SubsetConstruction() {
    }

    public static Automaton convertNfaToDfa(Automaton nfa) {
        Set<String> alphabet = nfa.getAlphabet().stream()
                .filter(symbol -> !symbol.equals(EPSILON))
                .collect(Collectors.toSet());

        Map<Set<String>, String> stateNames = new HashMap<>();
        Map<String, Set<String>> reverseStateNames = new HashMap<>();

        Set<String> startClosure = epsilonClosure(Set.of(nfa.getInitialState()), nfa);
        String startName = formatStateName(startClosure);
        stateNames.put(startClosure, startName);
        reverseStateNames.put(startName, startClosure);

        Set<String> dfaStates = new LinkedHashSet<>();
        Set<String> dfaFinals = new LinkedHashSet<>();
        Set<Transition> dfaTransitions = new LinkedHashSet<>();

        Queue<Set<String>> processing = new ArrayDeque<>();
        processing.add(startClosure);

        while (!processing.isEmpty()) {
            Set<String> currentNfaStates = processing.poll();
            String currentDfaState = stateNames.get(currentNfaStates);
            dfaStates.add(currentDfaState);

            if (currentNfaStates.stream().anyMatch(nfa.getFinalStates()::contains)) {
                dfaFinals.add(currentDfaState);
            }

            for (String symbol : alphabet) {
                Set<String> nextStates = move(currentNfaStates, symbol, nfa);
                nextStates = epsilonClosure(nextStates, nfa);
                if (nextStates.isEmpty()) {
                    continue;
                }
                String nextName = stateNames.computeIfAbsent(nextStates, SubsetConstruction::formatStateName);
                reverseStateNames.putIfAbsent(nextName, nextStates);
                dfaTransitions.add(new Transition(currentDfaState, symbol, nextName));
                if (!dfaStates.contains(nextName)) {
                    processing.add(nextStates);
                }
            }
        }

        return new Automaton(dfaStates, alphabet, dfaTransitions, startName, dfaFinals);
    }

    private static Set<String> move(Set<String> states, String symbol, Automaton automaton) {
        return automaton.getTransitions().stream()
                .filter(transition -> states.contains(transition.getSource()) && transition.getSymbol().equals(symbol))
                .map(Transition::getTarget)
                .collect(Collectors.toSet());
    }

    private static Set<String> epsilonClosure(Set<String> states, Automaton automaton) {
        Set<String> closure = new LinkedHashSet<>(states);
        Queue<String> queue = new ArrayDeque<>(states);
        while (!queue.isEmpty()) {
            String state = queue.poll();
            automaton.getTransitions().stream()
                    .filter(t -> t.getSource().equals(state) && t.getSymbol().equals(EPSILON))
                    .map(Transition::getTarget)
                    .filter(closure::add)
                    .forEach(queue::add);
        }
        return closure;
    }

    private static String formatStateName(Set<String> stateSet) {
        return stateSet.stream().sorted().collect(Collectors.joining("_", "{", "}"));
    }
}
