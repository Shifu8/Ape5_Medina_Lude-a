import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

function SimulationPanel({ onSimulate, simulationResult, isLoading, error, automaton, examples }) {
  const [input, setInput] = useState('');

  const handleSimulate = async () => {
    if (!input.trim()) return;
    await onSimulate(input);
  };

  const getPlaceholder = () => {
    if (examples.length > 0) {
      return `ej: ${examples[0]}`;
    }
    return 'ej: aba (o separada por espacios)';
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <GlassCard title="Entrada" subtitle="Cadena de prueba" icon="📝" gradient="from-amber-500 to-orange-500">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSimulate()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSimulate}
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-slate-950 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            {isLoading ? 'Simulando...' : 'Simular'}
          </motion.button>
        </div>
      </GlassCard>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-rose-500/50 bg-rose-500/10 p-4 text-sm text-rose-300">
          {error}
        </motion.div>
      )}

      {simulationResult !== null && (
        <GlassCard title="Resultado" subtitle="Estado de la simulación" icon="✓" gradient="from-violet-500 to-purple-500">
          <div className="text-center">
            <div className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-lg font-bold ${
              simulationResult.accepted
                ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                : 'bg-red-500/20 text-red-300 border border-red-500/50'
            }`}>
              <span className="text-2xl">{simulationResult.accepted ? '✅' : '❌'}</span>
              <span>{simulationResult.accepted ? 'Aceptada' : 'Rechazada'}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {simulationResult.accepted 
                ? `La cadena "${input}" fue aceptada por el autómata.`
                : `La cadena "${input}" fue rechazada porque no lleva al estado final del autómata.`
              }
            </p>
            {!simulationResult.accepted && examples.length > 0 && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl">
                <p className="text-sm text-slate-300 mb-2">Ejemplos de cadenas aceptadas:</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(example)}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/30 transition"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
}

export default SimulationPanel;
