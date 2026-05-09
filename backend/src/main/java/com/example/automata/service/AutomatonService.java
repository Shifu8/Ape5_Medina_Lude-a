package com.example.automata.service;

import com.example.automata.algorithm.AutomatonComparator;
import com.example.automata.algorithm.Simulator;
import com.example.automata.algorithm.SubsetConstruction;
import com.example.automata.dto.AutomatonRequestDto;
import com.example.automata.dto.ComparisonResponseDto;
import com.example.automata.dto.ConversionResponseDto;
import com.example.automata.dto.MinimizationResultDto;
import com.example.automata.dto.SimulationComparisonDto;
import com.example.automata.dto.SimulationRequestDto;
import com.example.automata.dto.SimulationResponseDto;
import com.example.automata.dto.AutomatonSimulationDto;
import com.example.automata.model.Automaton;
import com.example.automata.model.Transition;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AutomatonService {

    private final MinimizadorAFDService minimizadorAFDService;

    public AutomatonService(MinimizadorAFDService minimizadorAFDService) {
        this.minimizadorAFDService = minimizadorAFDService;
    }

    public ConversionResponseDto convertNfaToDfa(AutomatonRequestDto request) {
        Automaton nfa = toAutomaton(request);
        Automaton dfa = SubsetConstruction.convertNfaToDfa(nfa);
        return new ConversionResponseDto(dfa);
    }

    public ConversionResponseDto minimizeDfa(AutomatonRequestDto request) {
        Automaton dfa = toAutomaton(request);
        MinimizationResultDto result = minimizadorAFDService.minimize(dfa);
        return new ConversionResponseDto(result.getMinimizedAutomaton());
    }

    public MinimizationResultDto minimizeDfaDetailed(AutomatonRequestDto request) {
        Automaton dfa = toAutomaton(request);
        return minimizadorAFDService.minimize(dfa);
    }

    public SimulationResponseDto simulate(SimulationRequestDto request) {
        Automaton automaton = toAutomaton(request.getAutomaton());
        boolean accepted = Simulator.accept(automaton, request.getInput());
        return new SimulationResponseDto(accepted, Collections.emptyList(), request.getInput());
    }

    public AutomatonSimulationDto simulateDetailed(String name, SimulationRequestDto request) {
        Automaton automaton = toAutomaton(request.getAutomaton());
        return Simulator.trace(automaton, name, request.getInput());
    }

    public SimulationComparisonDto compareSimulation(SimulationRequestDto request) {
        Automaton original = toAutomaton(request.getAutomaton());
        Automaton dfa = SubsetConstruction.convertNfaToDfa(original);
        Automaton minimized = minimizadorAFDService.minimize(dfa).getMinimizedAutomaton();

        AutomatonSimulationDto afndTrace = Simulator.trace(original, "AFND", request.getInput());
        AutomatonSimulationDto dfaTrace = Simulator.trace(dfa, "AFD", request.getInput());
        AutomatonSimulationDto minimizedTrace = Simulator.trace(minimized, "Minimized AFD", request.getInput());

        boolean consistent = afndTrace.isAccepted() == dfaTrace.isAccepted() && dfaTrace.isAccepted() == minimizedTrace.isAccepted();
        return new SimulationComparisonDto(afndTrace, dfaTrace, minimizedTrace, consistent);
    }

    public ComparisonResponseDto compareAutomata(AutomatonRequestDto request) {
        Automaton original = toAutomaton(request);
        Automaton dfa = SubsetConstruction.convertNfaToDfa(original);
        Automaton minimized = minimizadorAFDService.minimize(dfa).getMinimizedAutomaton();
        return AutomatonComparator.compare(original, dfa, minimized);
    }

    private Automaton toAutomaton(AutomatonRequestDto request) {
        Set<Transition> transitions = request.getTransitions().stream()
                .map(dto -> new Transition(dto.getSource(), dto.getSymbol(), dto.getTarget()))
                .collect(Collectors.toSet());
        return new Automaton(request.getStates(), request.getAlphabet(), transitions, request.getInitialState(), request.getFinalStates());
    }
}
