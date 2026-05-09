package com.example.automata.controller;

import com.example.automata.dto.AutomatonRequestDto;
import com.example.automata.dto.AutomatonSimulationDto;
import com.example.automata.dto.ComparisonResponseDto;
import com.example.automata.dto.ConversionResponseDto;
import com.example.automata.dto.MinimizationResultDto;
import com.example.automata.dto.SimulationComparisonDto;
import com.example.automata.dto.SimulationRequestDto;
import com.example.automata.dto.SimulationResponseDto;
import com.example.automata.service.AutomatonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automata")
public class AutomatonController {

    private final AutomatonService automatonService;

    public AutomatonController(AutomatonService automatonService) {
        this.automatonService = automatonService;
    }

    @PostMapping("/convert")
    public ResponseEntity<ConversionResponseDto> convert(@RequestBody AutomatonRequestDto request) {
        return ResponseEntity.ok(automatonService.convertNfaToDfa(request));
    }

    @PostMapping("/minimize")
    public ResponseEntity<ConversionResponseDto> minimize(@RequestBody AutomatonRequestDto request) {
        return ResponseEntity.ok(automatonService.minimizeDfa(request));
    }

    @PostMapping("/minimize/details")
    public ResponseEntity<MinimizationResultDto> minimizeDetails(@RequestBody AutomatonRequestDto request) {
        return ResponseEntity.ok(automatonService.minimizeDfaDetailed(request));
    }

    @PostMapping("/simulate")
    public ResponseEntity<SimulationResponseDto> simulate(@RequestBody SimulationRequestDto request) {
        return ResponseEntity.ok(automatonService.simulate(request));
    }

    @PostMapping("/simulate/details")
    public ResponseEntity<AutomatonSimulationDto> simulateDetails(@RequestParam String name, @RequestBody SimulationRequestDto request) {
        return ResponseEntity.ok(automatonService.simulateDetailed(name, request));
    }

    @PostMapping("/simulate/comparison")
    public ResponseEntity<SimulationComparisonDto> simulateComparison(@RequestBody SimulationRequestDto request) {
        return ResponseEntity.ok(automatonService.compareSimulation(request));
    }

    @PostMapping("/compare")
    public ResponseEntity<ComparisonResponseDto> compare(@RequestBody AutomatonRequestDto request) {
        return ResponseEntity.ok(automatonService.compareAutomata(request));
    }
}
