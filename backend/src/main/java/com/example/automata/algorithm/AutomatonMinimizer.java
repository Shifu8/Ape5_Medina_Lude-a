package com.example.automata.algorithm;

import com.example.automata.model.Automaton;
import com.example.automata.model.Transition;

import java.util.*;
import java.util.stream.Collectors;

public final class AutomatonMinimizer {

    private AutomatonMinimizer() {
    }

    public static Automaton minimize(Automaton automaton) {
        Set<String> alphabet = automaton.getAlphabet();
        Map<String, Map<String, String>> transitions = buildTransitionMap(automaton);

        Set<Set<String>> partitions = new LinkedHashSet<>();
        Set<String> finalStates = automaton.getFinalStates();
        Set<String> nonFinalStates = new LinkedHashSet<>(automaton.getStates());
        nonFinalStates.removeAll(finalStates);

        if (!nonFinalStates.isEmpty()) {
            partitions.add(nonFinalStates);
        }
        if (!finalStates.isEmpty()) {
            partitions.add(finalStates);
        }

        boolean refined;
        do {
            refined = false;
            Set<Set<String>> nextPartitions = new LinkedHashSet<>();
            Set<Set<String>> currentPartitions = new LinkedHashSet<>(partitions);

            for (Set<String> group : currentPartitions) {
                Map<List<String>, Set<String>> split = new LinkedHashMap<>();
                for (String state : group) {
                    List<String> signature = alphabet.stream()
                            .map(symbol -> getPartitionId(transitions.get(state).get(symbol), currentPartitions))
                            .collect(Collectors.toList());
                    split.computeIfAbsent(signature, key -> new LinkedHashSet<>()).add(state);
                }
                nextPartitions.addAll(split.values());
                if (split.size() > 1) {
                    refined = true;
                }
            }
            partitions = nextPartitions;
        } while (refined);

        Map<String, String> stateToClass = partitions.stream()
                .flatMap(group -> group.stream().map(state -> Map.entry(state, String.join("_", group))))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        Set<String> minimizedStates = new LinkedHashSet<>(stateToClass.values());
        Set<String> minimizedFinals = finalStates.stream().map(stateToClass::get).collect(Collectors.toSet());
        String minimizedInitial = stateToClass.get(automaton.getInitialState());

        Set<Transition> minimizedTransitions = partitions.stream()
                .flatMap(group -> {
                    String representative = group.iterator().next();
                    return alphabet.stream()
                            .map(symbol -> transitions.get(representative).get(symbol))
                            .filter(Objects::nonNull)
                            .map(target -> new Transition(String.join("_", group), findSymbolForTransition(transitions.get(representative), target), stateToClass.get(target)));
                })
                .collect(Collectors.toSet());

        return new Automaton(minimizedStates, alphabet, minimizedTransitions, minimizedInitial, minimizedFinals);
    }

    private static Map<String, Map<String, String>> buildTransitionMap(Automaton automaton) {
        Map<String, Map<String, String>> transitionMap = new LinkedHashMap<>();
        for (String state : automaton.getStates()) {
            Map<String, String> row = new LinkedHashMap<>();
            for (String symbol : automaton.getAlphabet()) {
                transitionMap.putIfAbsent(state, new LinkedHashMap<>());
                automaton.getTransitions().stream()
                        .filter(t -> t.getSource().equals(state) && t.getSymbol().equals(symbol))
                        .findFirst()
                        .ifPresent(transition -> row.put(symbol, transition.getTarget()));
            }
            transitionMap.put(state, row);
        }
        return transitionMap;
    }

    private static String getPartitionId(String target, Set<Set<String>> partitions) {
        if (target == null) {
            return "_";
        }
        return partitions.stream()
                .filter(part -> part.contains(target))
                .findFirst()
                .map(group -> String.join("_", group))
                .orElse("_");
    }

    private static String findSymbolForTransition(Map<String, String> transitions, String target) {
        return transitions.entrySet().stream()
                .filter(entry -> target.equals(entry.getValue()))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse("");
    }
}
