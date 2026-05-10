import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const diagramNameMap = {
  iot: 'IoT',
  ecommerce: 'Comprador Potencial',
  slack: 'Bot Slack',
};

function MinimizationPanel({ automaton, onMinimize, isLoading }) {
  const [minimized, setMinimized] = useState(null);
  const [details, setDetails] = useState(null);
  const diagramLabel = diagramNameMap[automaton.id] || automaton.name;
  const originalDiagram = encodeURI(`/Imagenes/AFD/AFD ${diagramLabel}.png`);
  const minimizedDiagram = encodeURI(`/Imagenes/AFD Minimizacion/AFD Minimizacion ${diagramLabel}.png`);

  const handleMinimize = async () => {
    const { minimized: min, details: det } = await onMinimize();
    setMinimized(min);
    setDetails(det);
  };

  return (
    <div className="space-y-6">
      <GlassCard title="Minimización de AFD" subtitle="Algoritmo de tabla de equivalencia" icon="⚡" gradient="from-green-500 to-emerald-500">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            La minimización de AFD reduce el número de estados eliminando aquellos que son equivalentes. El algoritmo marca pares de estados no equivalentes iterativamente hasta converger.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMinimize}
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-slate-950 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
          >
            {isLoading ? 'Minimizando...' : '⚡ Minimizar AFD'}
          </motion.button>
        </div>
      </GlassCard>

      {minimized && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard title="AFD Original" subtitle="Antes de minimización" gradient="from-cyan-500 to-blue-500">
              <div className="h-96 rounded-2xl border border-slate-700/50 bg-slate-950/50 overflow-auto flex items-center justify-center">
                <img
                  src={originalDiagram}
                  alt={`${automaton.name} AFD original`}
                  className="h-full w-full object-contain bg-slate-950 transition-transform duration-300 hover:scale-110 cursor-zoom-in"
                />
              </div>
            </GlassCard>

            <GlassCard title="AFD Minimizado" subtitle="Después de minimización" gradient="from-green-500 to-emerald-500">
              <div className="h-96 rounded-2xl border border-slate-700/50 bg-slate-950/50 overflow-auto flex items-center justify-center">
                <img
                  src={minimizedDiagram}
                  alt={`${automaton.name} AFD minimizado`}
                  className="h-full w-full object-contain bg-slate-950 transition-transform duration-300 hover:scale-110 cursor-zoom-in"
                />
              </div>
            </GlassCard>
          </div>

          <GlassCard title="Estadísticas" subtitle="Comparación de autómatas" icon="📊" gradient="from-orange-500 to-red-500">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados AFD</p>
                <p className="mt-2 text-2xl font-bold text-cyan-300">{automaton.states.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados Minimizados</p>
                <p className="mt-2 text-2xl font-bold text-green-300">{minimized.states.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Reducción</p>
                <p className="mt-2 text-2xl font-bold text-emerald-300">
                  {((1 - minimized.states.length / automaton.states.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Transiciones Reducidas</p>
                <p className="mt-2 text-2xl font-bold text-pink-300">
                  {automaton.transitions.length - minimized.transitions.length}
                </p>
              </div>
            </div>
          </GlassCard>

          {details && details.steps && (
            <GlassCard title="Proceso de minimización" subtitle="Pasos del algoritmo" icon="🔬" gradient="from-indigo-500 to-blue-500">
              <div className="space-y-4 max-h-96 overflow-auto">
                {details.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-2xl border border-slate-700/50 bg-slate-900/30 p-4 backdrop-blur-sm"
                  >
                    <p className="font-semibold text-cyan-300">Iteración {idx + 1}</p>
                    <p className="mt-2 text-sm text-slate-300">{step.description}</p>
                    {step.markedPairs && (
                      <p className="mt-2 text-xs text-slate-500">
                        Pares marcados: {step.markedPairs.join(', ') || 'Ninguno'}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default MinimizationPanel;
