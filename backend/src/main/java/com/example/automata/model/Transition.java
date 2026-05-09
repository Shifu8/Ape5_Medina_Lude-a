package com.example.automata.model;

import java.util.Objects;

public class Transition {
    private final String source;
    private final String symbol;
    private final String target;

    public Transition(String source, String symbol, String target) {
        this.source = source;
        this.symbol = symbol;
        this.target = target;
    }

    public String getSource() {
        return source;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getTarget() {
        return target;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transition that = (Transition) o;
        return Objects.equals(source, that.source) && Objects.equals(symbol, that.symbol) && Objects.equals(target, that.target);
    }

    @Override
    public int hashCode() {
        return Objects.hash(source, symbol, target);
    }
}
