package com.example.automata.service;

import com.example.automata.dto.MinimizationIterationDto;
import com.example.automata.dto.MinimizationResultDto;
import com.example.automata.dto.StatePairDto;
import com.example.automata.model.Automaton;
import com.example.automata.model.Transition;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MinimizadorAFDService {

    public MinimizationResultDto minimize(Automaton automaton) {
        List<String> alphabet = new ArrayList<>(automaton.getAlphabet());
        List<String> states = automaton.getStates().stream().sorted().collect(Collectors.toList());
        Map<String, Map<String, String>> transitionTable = buildTransitionTable(automaton, alphabet);

        Set<String> finalStates = new LinkedHashSet<>(automaton.getFinalStates());
        List<StatePair> allPairs = buildPairs(states);
        Set<StatePair> marked = new LinkedHashSet<>();
        List<MinimizationIterationDto> iterations = new ArrayList<>();

        List<StatePairDto> initialPairs = allPairs.stream()
                .map(pair -> createStatePairDto(pair, isMarkedByFinals(pair, finalStates), pair.getReason()))
                .collect(Collectors.toList());

        List<StatePairDto> initiallyMarked = initialPairs.stream()
                .filter(StatePairDto::isMarked)
                .collect(Collectors.toList());

        marked.addAll(initialPairs.stream()
                .filter(StatePairDto::isMarked)
                .map(pairDto -> new StatePair(pairDto.getStateA(), pairDto.getStateB()))
                .collect(Collectors.toList()));

        iterations.add(new MinimizationIterationDto(0, initialPairs, initiallyMarked));

        int iteration = 1;
        boolean changed;
        do {
            changed = false;
            List<StatePairDto> newlyMarked = new ArrayList<>();
            for (StatePair pair : allPairs) {
                if (marked.contains(pair)) {
                    continue;
                }

                Optional<String> reason = markIfDistinguishable(pair, alphabet, transitionTable, marked);
                if (reason.isPresent()) {
                    marked.add(pair);
                    newlyMarked.add(createStatePairDto(pair, true, reason.get()));
                    changed = true;
                }
            }

            List<StatePairDto> pairDtos = allPairs.stream()
                    .map(pair -> createStatePairDto(pair, marked.contains(pair), findReason(pair, alphabet, transitionTable, marked, finalStates)))
                    .collect(Collectors.toList());
            iterations.add(new MinimizationIterationDto(iteration++, pairDtos, newlyMarked));
        } while (changed);

        List<List<String>> equivalenceClasses = buildEquivalenceClasses(states, marked);
        Set<String> minimizedStates = equivalenceClasses.stream()
                .map(this::formatClassName)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        Automaton minimizedAutomaton = buildMinimizedAutomaton(alphabet, transitionTable, equivalenceClasses, automaton);
        int originalCount = states.size();
        int minimizedCount = minimizedStates.size();
        double reduction = originalCount == 0 ? 0.0 : ((originalCount - minimizedCount) * 100.0 / originalCount);

        MinimizationResultDto result = new MinimizationResultDto();
        result.setOriginalStates(new LinkedHashSet<>(states));
        result.setMinimizedStates(minimizedStates);
        result.setOriginalStateCount(originalCount);
        result.setMinimizedStateCount(minimizedCount);
        result.setReductionPercentage(round(reduction));
        result.setEquivalenceClasses(equivalenceClasses);
        result.setIterations(iterations);
        result.setMinimizedAutomaton(minimizedAutomaton);
        return result;
    }

    private Optional<String> markIfDistinguishable(StatePair pair, List<String> alphabet, Map<String, Map<String, String>> transitionTable, Set<StatePair> marked) {
        for (String symbol : alphabet) {
            String targetA = transitionTable.get(pair.first()).get(symbol);
            String targetB = transitionTable.get(pair.second()).get(symbol);
            if (!Objects.equals(targetA, targetB)) {
                if (targetA == null || targetB == null) {
                    return Optional.of(String.format("Distinguible porque %s y %s tienen transiciones diferentes para '%s'", pair.first(), pair.second(), symbol));
                }
                StatePair targetPair = new StatePair(targetA, targetB);
                if (marked.contains(targetPair)) {
                    return Optional.of(String.format("Distinguible porque la transición '%s' lleva a par marcado %s", symbol, targetPair));
                }
            }
        }
        return Optional.empty();
    }

    private String findReason(StatePair pair, List<String> alphabet, Map<String, Map<String, String>> transitionTable, Set<StatePair> marked, Set<String> finalStates) {
        if (isMarkedByFinals(pair, finalStates)) {
            return "Estados con final / no final distintivos";
        }
        for (String symbol : alphabet) {
            String targetA = transitionTable.get(pair.first()).get(symbol);
            String targetB = transitionTable.get(pair.second()).get(symbol);
            if (!Objects.equals(targetA, targetB)) {
                if (targetA == null || targetB == null) {
                    return String.format("Distinguible por transiciones distintas en '%s'", symbol);
                }
                StatePair targetPair = new StatePair(targetA, targetB);
                if (marked.contains(targetPair)) {
                    return String.format("Distinguible porque '%s' lleva a par marcado %s", symbol, targetPair);
                }
            }
        }
        return "No distinguible en esta iteración";
    }

    private boolean isMarkedByFinals(StatePair pair, Set<String> finalStates) {
        boolean firstFinal = finalStates.contains(pair.first());
        boolean secondFinal = finalStates.contains(pair.second());
        return firstFinal ^ secondFinal;
    }

    private List<StatePair> buildPairs(List<String> states) {
        List<StatePair> pairs = new ArrayList<>();
        for (int i = 0; i < states.size(); i++) {
            for (int j = i + 1; j < states.size(); j++) {
                pairs.add(new StatePair(states.get(i), states.get(j)));
            }
        }
        return pairs;
    }

    private Map<String, Map<String, String>> buildTransitionTable(Automaton automaton, List<String> alphabet) {
        Map<String, Map<String, String>> table = new LinkedHashMap<>();
        for (String state : automaton.getStates()) {
            Map<String, String> row = new LinkedHashMap<>();
            for (String symbol : alphabet) {
                row.put(symbol, automaton.getTransitions().stream()
                        .filter(transition -> transition.getSource().equals(state) && transition.getSymbol().equals(symbol))
                        .map(Transition::getTarget)
                        .findFirst()
                        .orElse(null));
            }
            table.put(state, row);
        }
        return table;
    }

    private List<List<String>> buildEquivalenceClasses(List<String> states, Set<StatePair> marked) {
        UnionFind unionFind = new UnionFind(states);
        for (StatePair pair : buildPairs(states)) {
            if (!marked.contains(pair)) {
                unionFind.union(pair.first(), pair.second());
            }
        }
        Map<String, List<String>> classes = new LinkedHashMap<>();
        for (String state : states) {
            String root = unionFind.find(state);
            classes.computeIfAbsent(root, key -> new ArrayList<>()).add(state);
        }
        return classes.values().stream()
                .map(list -> list.stream().sorted().collect(Collectors.toList()))
                .sorted(Comparator.comparing(o -> o.get(0)))
                .collect(Collectors.toList());
    }

    private Automaton buildMinimizedAutomaton(List<String> alphabet, Map<String, Map<String, String>> transitionTable, List<List<String>> equivalenceClasses, Automaton original) {
        Map<String, String> stateToClass = new LinkedHashMap<>();
        for (List<String> group : equivalenceClasses) {
            String className = formatClassName(group);
            for (String member : group) {
                stateToClass.put(member, className);
            }
        }
        Set<String> minimizedStates = new LinkedHashSet<>(stateToClass.values());
        Set<String> minimizedFinals = original.getFinalStates().stream()
                .map(stateToClass::get)
                .collect(Collectors.toSet());
        String minimizedInitial = stateToClass.get(original.getInitialState());

        Set<Transition> minimizedTransitions = new LinkedHashSet<>();
        for (List<String> group : equivalenceClasses) {
            String sourceClass = formatClassName(group);
            String representative = group.get(0);
            for (String symbol : alphabet) {
                String target = transitionTable.get(representative).get(symbol);
                if (target != null) {
                    String targetClass = stateToClass.get(target);
                    minimizedTransitions.add(new Transition(sourceClass, symbol, targetClass));
                }
            }
        }

        return new Automaton(minimizedStates, new LinkedHashSet<>(alphabet), minimizedTransitions, minimizedInitial, minimizedFinals);
    }

    private String formatClassName(List<String> classStates) {
        if (classStates.size() == 1) {
            return classStates.get(0);
        }
        return classStates.stream().collect(Collectors.joining(",", "[", "]"));
    }

    private StatePairDto createStatePairDto(StatePair pair, boolean marked, String reason) {
        return new StatePairDto(pair.first(), pair.second(), marked, reason);
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private record StatePair(String first, String second) {
        public StatePair {
            if (first.compareTo(second) > 0) {
                String temp = first;
                first = second;
                second = temp;
            }
        }

        public String getReason() {
            return String.format("Par (%s, %s)", first, second);
        }

        @Override
        public String toString() {
            return String.format("(%s, %s)", first, second);
        }
    }

    private static class UnionFind {
        private final Map<String, String> parent;

        public UnionFind(List<String> items) {
            parent = new LinkedHashMap<>();
            for (String item : items) {
                parent.put(item, item);
            }
        }

        public String find(String item) {
            String root = parent.get(item);
            if (!root.equals(item)) {
                root = find(root);
                parent.put(item, root);
            }
            return root;
        }

        public void union(String a, String b) {
            String rootA = find(a);
            String rootB = find(b);
            if (!rootA.equals(rootB)) {
                parent.put(rootA, rootB);
            }
        }
    }
}
