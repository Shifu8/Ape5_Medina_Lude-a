package com.example.automata.dto;

public class StatePairDto {
    private String stateA;
    private String stateB;
    private boolean marked;
    private String reason;

    public StatePairDto() {
    }

    public StatePairDto(String stateA, String stateB, boolean marked, String reason) {
        this.stateA = stateA;
        this.stateB = stateB;
        this.marked = marked;
        this.reason = reason;
    }

    public String getStateA() {
        return stateA;
    }

    public void setStateA(String stateA) {
        this.stateA = stateA;
    }

    public String getStateB() {
        return stateB;
    }

    public void setStateB(String stateB) {
        this.stateB = stateB;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
