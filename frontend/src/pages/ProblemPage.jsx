import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AutomataVisualization from '../components/sections/AutomataVisualization';
import ConvertMinimizePanel from '../components/sections/ConvertMinimizePanel';
import SimulationPanel from '../components/sections/SimulationPanel';
import { simulateAutomaton } from '../services/api';

const examples = {
  iot: ['HDR TEMP CRC', 'HDR HUM CRC', 'HDR CRC'],
  ecommerce: ['HOME SEARCH CART', 'HOME CART'],
  slack: ['@bot !cmd', '@bot USER !cmd', '@bot ?help']
};

function ProblemPage({ automaton, title, subtitle, icon }) {
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const problemExamples = examples[automaton.id.toLowerCase()] || [];

  const handleSimulate = async (input) => {
    if (!input.trim()) return;
    setError(null);
    setLoading(true);

    try {
      const result = await simulateAutomaton(automaton, input);
      setSimulationResult(result);
    } catch (err) {
      setError('Error al simular. Verifica la cadena y vuelve a intentar.');
      setSimulationResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col gap-3 sm:items-start sm:justify-between sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-medium text-cyan-300 shadow-inner shadow-cyan-500/10">
              <span className="text-xl">{icon}</span>
              <span>{automaton.name}</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold text-white">{title}</h1>
            <p className="mt-2 max-w-2xl text-slate-400">{subtitle}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <AutomataVisualization
            automaton={automaton}
            title={`${automaton.name} - Autómata`}
            subtitle="Diagrama y tabla de transiciones dinámico"
            icon={icon}
          />

          <ConvertMinimizePanel automaton={automaton} />
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="rounded-3xl border border-slate-700/50 bg-slate-900/40 p-6 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">Contexto del problema</h2>
              <p className="mt-4 text-sm text-slate-300">Esta sección mantiene el autómata, el alfabeto y la expresión regular actualizados según el problema seleccionado en el sidebar.</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-slate-700/50 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Expresión regular</p>
                  <p className="mt-2 text-slate-100">{automaton.regex}</p>
                </div>
                <div className="rounded-3xl border border-slate-700/50 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Alfabeto</p>
                  <p className="mt-2 text-slate-100">{Array.isArray(automaton.alphabet) ? automaton.alphabet.join(', ') : Array.from(automaton.alphabet).join(', ')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <SimulationPanel 
            onSimulate={handleSimulate} 
            simulationResult={simulationResult} 
            isLoading={loading} 
            error={error}
            automaton={automaton}
            examples={problemExamples}
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;
