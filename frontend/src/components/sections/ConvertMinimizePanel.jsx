import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import AutomataDiagram from '../diagrams/AutomataDiagram';
import { convertAutomaton, minimizeAutomatonDetailed } from '../../services/api';

function ConvertMinimizePanel({ automaton }) {
  const [dfa, setDfa] = useState(null);
  const [minimized, setMinimized] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvertAndMinimize = async () => {
    setError(null);
    setLoading(true);
    try {
      const converted = await convertAutomaton(automaton);
      if (!converted) throw new Error('La conversión no devolvió un AFD válido.');

      const minimizedResult = await minimizeAutomatonDetailed(converted);
      const minimizedAutomaton = minimizedResult?.minimizedAutomaton || minimizedResult?.minimized;
      if (!minimizedAutomaton) throw new Error('La minimización no devolvió un AFD válido.');

      setDfa(converted);
      setMinimized(minimizedAutomaton);
      setDetails(minimizedResult);
    } catch (err) {
      setError('Error al convertir y minimizar. Intenta de nuevo.');
      setDfa(null);
      setMinimized(null);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard title="Convertir y Minimizar" subtitle="Genera el AFD y su versión minimizada" icon="⚡" gradient="from-blue-500 to-cyan-500">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Presiona el botón para convertir el autómata actual en un AFD equivalente y luego aplicar la minimización en la misma pantalla.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConvertAndMinimize}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-slate-950 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            {loading ? 'Procesando...' : 'Convertir y Minimizar'}
          </motion.button>
        </div>
      </GlassCard>

      {error && (
        <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      {dfa && minimized && (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-3">
            <GlassCard title="AFND / AFD actual" subtitle="Autómata original" gradient="from-violet-500 to-pink-500">
              <div className="h-80 overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950/50 p-3">
                <AutomataDiagram automaton={automaton} />
              </div>
            </GlassCard>
            <GlassCard title="AFD resultante" subtitle="Conversión del autómata" gradient="from-cyan-500 to-blue-500">
              <div className="h-80 overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950/50 p-3">
                <AutomataDiagram automaton={dfa} />
              </div>
            </GlassCard>
            <GlassCard title="AFD minimizado" subtitle="Autómata optimizado" gradient="from-emerald-500 to-lime-500">
              <div className="h-80 overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950/50 p-3">
                <AutomataDiagram automaton={minimized} />
              </div>
            </GlassCard>
          </div>

          <GlassCard title="Resumen de resultados" subtitle="Comparación de tamaño" icon="📊" gradient="from-orange-500 to-red-500">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados iniciales</p>
                <p className="mt-2 text-2xl font-bold text-cyan-300">{automaton.states.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados AFD</p>
                <p className="mt-2 text-2xl font-bold text-blue-300">{dfa.states.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados minimizados</p>
                <p className="mt-2 text-2xl font-bold text-emerald-300">{minimized.states.length}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

export default ConvertMinimizePanel;
