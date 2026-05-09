package com.example.automata.algorithm;

import com.example.automata.dto.AutomatonSimulationDto;
import com.example.automata.dto.SimulationStepDto;
import com.example.automata.model.Automaton;
import com.example.automata.model.Transition;

import java.util.*;
import java.util.stream.Collectors;

public final class Simulator {

    private Simulator() {
    }

    public static AutomatonSimulationDto trace(Automaton automaton, String name, String input) {
        List<String> tokens = splitInput(input);
        List<SimulationStepDto> steps = new ArrayList<>();
        Set<String> currentStates = epsilonClosure(Set.of(automaton.getInitialState()), automaton);
        List<String> path = new ArrayList<>();
        path.add(formatStateSet(currentStates));
        List<String> initialStates = new ArrayList<>(currentStates);

        for (String symbol : tokens) {
            Set<String> beforeStates = new LinkedHashSet<>(currentStates);
            Set<Transition> usedTransitions = automaton.getTransitions().stream()
                    .filter(t -> beforeStates.contains(t.getSource()) && t.getSymbol().equals(symbol))
                    .collect(Collectors.toCollection(LinkedHashSet::new));

            Set<String> nextStates = usedTransitions.stream()
                    .map(Transition::getTarget)
                    .collect(Collectors.toCollection(LinkedHashSet::new));
            Set<String> afterStates = epsilonClosure(nextStates, automaton);
            if (afterStates.isEmpty()) {
                steps.add(new SimulationStepDto(symbol, new ArrayList<>(beforeStates), Collections.singletonList("∅"), formatTransitions(usedTransitions), formatEdgeIds(usedTransitions)));
                path.add("∅");
                currentStates = afterStates;
                break;
            }
            steps.add(new SimulationStepDto(symbol, new ArrayList<>(beforeStates), new ArrayList<>(afterStates), formatTransitions(usedTransitions), formatEdgeIds(usedTransitions)));
            path.add(formatStateSet(afterStates));
            currentStates = afterStates;
        }

        boolean accepted = currentStates.stream().anyMatch(automaton.getFinalStates()::contains);
        return new AutomatonSimulationDto(name, input, accepted, initialStates, path, steps);
    }

    public static boolean accept(Automaton automaton, String input) {
        Set<String> states = epsilonClosure(Set.of(automaton.getInitialState()), automaton);
        for (String symbol : splitInput(input)) {
            states = epsilonClosure(move(states, symbol, automaton), automaton);
            if (states.isEmpty()) {
                return false;
            }
        }
        return states.stream().anyMatch(automaton.getFinalStates()::contains);
    }

    private static Set<String> move(Set<String> states, String symbol, Automaton automaton) {
        return automaton.getTransitions().stream()
                .filter(t -> states.contains(t.getSource()) && t.getSymbol().equals(symbol))
                .map(Transition::getTarget)
                .collect(Collectors.toSet());
    }

    private static Set<String> epsilonClosure(Set<String> states, Automaton automaton) {
        Set<String> closure = new LinkedHashSet<>(states);
        Queue<String> queue = new ArrayDeque<>(states);
        while (!queue.isEmpty()) {
            String state = queue.poll();
            automaton.getTransitions().stream()
                    .filter(t -> t.getSource().equals(state) && t.getSymbol().equals("ε"))
                    .map(Transition::getTarget)
                    .filter(closure::add)
                    .forEach(queue::add);
        }
        return closure;
    }

    private static List<String> splitInput(String input) {
        if (input == null || input.isBlank()) {
            return Collections.emptyList();
        }
        String trimmed = input.trim();
        if (trimmed.contains(" ")) {
            return Arrays.stream(trimmed.split("\\s+"))
                    .filter(token -> !token.isBlank())
                    .collect(Collectors.toList());
        }
        return trimmed.chars()
                .mapToObj(c -> String.valueOf((char) c))
                .collect(Collectors.toList());
    }

    private static String formatStateSet(Set<String> states) {
        return states.isEmpty() ? "∅" : String.join("/", states);
    }

    private static List<String> formatTransitions(Set<Transition> transitions) {
        return transitions.stream()
                .map(t -> String.format("%s -%s-> %s", t.getSource(), t.getSymbol(), t.getTarget()))
                .collect(Collectors.toList());
    }

    private static List<String> formatEdgeIds(Set<Transition> transitions) {
        return transitions.stream()
                .map(t -> String.format("%s-%s-%s", t.getSource(), t.getSymbol(), t.getTarget()))
                .collect(Collectors.toList());
    }
}
