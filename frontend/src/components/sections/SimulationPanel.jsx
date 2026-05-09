import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

function SimulationPanel({ onSimulate, comparison, isLoading, error }) {
  const [input, setInput] = useState('');
  const [stepIndex, setStepIndex] = useState(0);

  const handleSimulate = async () => {
    if (!input.trim()) return;
    await onSimulate(input);
    setStepIndex(0);
  };

  const stepCount = comparison
    ? Math.max(comparison.afnd.steps.length, comparison.dfa.steps.length, comparison.minimized.steps.length)
    : 0;

  const getStep = (trace) => {
    if (!trace || !trace.steps) return null;
    return trace.steps[Math.min(stepIndex, trace.steps.length - 1)];
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
            placeholder="ej: aba (o separada por espacios)"
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

      {comparison && (
        <>
          {/* Control de pasos */}
          <GlassCard title="Control de simulación" subtitle={`Paso ${Math.min(stepIndex + 1, stepCount)} de ${stepCount}`} icon="⏱️" gradient="from-green-500 to-emerald-500">
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStepIndex(0)}
                disabled={stepIndex === 0}
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 hover:bg-slate-800"
              >
                ⏮️ Inicio
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
                disabled={stepIndex === 0}
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 hover:bg-slate-800"
              >
                ◀️ Anterior
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStepIndex(Math.min(stepCount - 1, stepIndex + 1))}
                disabled={stepIndex >= stepCount - 1}
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 hover:bg-slate-800"
              >
                Siguiente ▶️
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStepIndex(stepCount - 1)}
                disabled={stepIndex >= stepCount - 1}
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 hover:bg-slate-800"
              >
                Final ⏭️
              </motion.button>
            </div>
          </GlassCard>

          {/* Información de cadena */}
          <GlassCard title="Resultado" subtitle="Aceptación de cadena" icon="✓" gradient="from-violet-500 to-purple-500">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-slate-400">Cadena</p>
                <p className="mt-2 text-lg font-bold text-slate-100">{comparison.afnd.input}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-slate-400">Consistencia</p>
                <p className={`mt-2 text-lg font-bold ${comparison.consistent ? 'text-green-400' : 'text-rose-400'}`}>
                  {comparison.consistent ? '✓ Sí' : '✗ No'}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-slate-400">AFND</p>
                <p className={`mt-2 text-lg font-bold ${comparison.afnd.accepted ? 'text-green-400' : 'text-slate-400'}`}>
                  {comparison.afnd.accepted ? '✓ Acepta' : '✗ Rechaza'}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-slate-400">AFD Minimizado</p>
                <p className={`mt-2 text-lg font-bold ${comparison.minimized.accepted ? 'text-green-400' : 'text-slate-400'}`}>
                  {comparison.minimized.accepted ? '✓ Acepta' : '✗ Rechaza'}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Traza paso a paso */}
          <div className="grid gap-6 lg:grid-cols-3">
            {['AFND', 'AFD', 'Minimizado'].map((name, idx) => {
              const trace = name === 'AFND' ? comparison.afnd : name === 'AFD' ? comparison.dfa : comparison.minimized;
              const step = getStep(trace);
              const icons = ['🔌', '⚙️', '✨'];
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard title={name} subtitle={`Estado: ${step?.afterStates.join(', ') || 'Inicial'}`} icon={icons[idx]}>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Aceptada:</p>
                        <p className={`font-semibold ${trace.accepted ? 'text-green-400' : 'text-slate-400'}`}>
                          {trace.accepted ? '✓ Sí' : '✗ No'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Estados iniciales:</p>
                        <p className="font-mono text-xs text-cyan-300">{trace.initialStates.join(', ')}</p>
                      </div>
                      {step && (
                        <>
                          <div>
                            <p className="text-xs text-slate-500">Símbolo procesado:</p>
                            <p className="font-bold text-amber-300">{step.symbol}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Antes:</p>
                            <p className="font-mono text-xs text-slate-300">{step.beforeStates.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Después:</p>
                            <p className="font-mono text-xs text-cyan-300">{step.afterStates.join(', ')}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Detalle de transiciones */}
          {stepCount > 0 && (
            <GlassCard title="Análisis del paso" subtitle={`Detalle de transiciones paso ${stepIndex + 1}`} icon="🔬" gradient="from-indigo-500 to-blue-500">
              <div className="grid gap-4 lg:grid-cols-3">
                {['AFND', 'AFD', 'Minimizado'].map((name, idx) => {
                  const trace = name === 'AFND' ? comparison.afnd : name === 'AFD' ? comparison.dfa : comparison.minimized;
                  const step = getStep(trace);
                  return (
                    <div key={name} className="rounded-2xl border border-slate-700/50 bg-slate-900/30 p-4 backdrop-blur-sm">
                      <h4 className="mb-3 font-semibold text-slate-100">{name}</h4>
                      {step && step.transitions.length > 0 ? (
                        <ul className="space-y-2 text-xs">
                          {step.transitions.map((trans, i) => (
                            <li key={i} className="font-mono text-slate-300 break-all">
                              <span className="text-cyan-400">{trans}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-500">Sin transiciones en este paso</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          )}
        </>
      )}
    </div>
  );
}

export default SimulationPanel;
