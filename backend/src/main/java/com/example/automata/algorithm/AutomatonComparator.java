package com.example.automata.algorithm;

import com.example.automata.dto.ComparisonResponseDto;
import com.example.automata.model.Automaton;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class AutomatonComparator {

    private AutomatonComparator() {
    }

    public static ComparisonResponseDto compare(Automaton original, Automaton dfa, Automaton minimized) {
        Map<String, String> summary = new LinkedHashMap<>();
        summary.put("Original states", String.valueOf(original.getStates().size()));
        summary.put("DFA states", String.valueOf(dfa.getStates().size()));
        summary.put("Minimized DFA states", String.valueOf(minimized.getStates().size()));
        summary.put("Original final states", String.valueOf(original.getFinalStates().size()));
        summary.put("DFA final states", String.valueOf(dfa.getFinalStates().size()));
        summary.put("Minimized final states", String.valueOf(minimized.getFinalStates().size()));

        List<String> checkedStrings = List.of("", "a", "b", "ab", "ba", "aba");

        return new ComparisonResponseDto(original, dfa, minimized, summary, checkedStrings);
    }
}
