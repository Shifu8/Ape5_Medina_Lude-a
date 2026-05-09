package com.example.automata.dto;

import com.example.automata.model.Automaton;

import java.util.List;
import java.util.Map;

public class ComparisonResponseDto {
    private Automaton original;
    private Automaton dfa;
    private Automaton minimized;
    private Map<String, String> summary;
    private List<String> checkedStrings;

    public ComparisonResponseDto() {
    }

    public ComparisonResponseDto(Automaton original, Automaton dfa, Automaton minimized, Map<String, String> summary, List<String> checkedStrings) {
        this.original = original;
        this.dfa = dfa;
        this.minimized = minimized;
        this.summary = summary;
        this.checkedStrings = checkedStrings;
    }

    public Automaton getOriginal() {
        return original;
    }

    public void setOriginal(Automaton original) {
        this.original = original;
    }

    public Automaton getDfa() {
        return dfa;
    }

    public void setDfa(Automaton dfa) {
        this.dfa = dfa;
    }

    public Automaton getMinimized() {
        return minimized;
    }

    public void setMinimized(Automaton minimized) {
        this.minimized = minimized;
    }

    public Map<String, String> getSummary() {
        return summary;
    }

    public void setSummary(Map<String, String> summary) {
        this.summary = summary;
    }

    public List<String> getCheckedStrings() {
        return checkedStrings;
    }

    public void setCheckedStrings(List<String> checkedStrings) {
        this.checkedStrings = checkedStrings;
    }
}
