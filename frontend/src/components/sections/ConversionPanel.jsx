import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import AutomataDiagram from '../diagrams/AutomataDiagram';

function ConversionPanel({ automaton, onConvert, isLoading }) {
  const [converted, setConverted] = useState(null);

  const handleConvert = async () => {
    const result = await onConvert();
    setConverted(result);
  };

  return (
    <div className="space-y-6">
      <GlassCard title="Conversión AFND → AFD" subtitle="Construcción de subconjuntos (Subset Construction)" icon="🔄" gradient="from-blue-500 to-cyan-500">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            La construcción de subconjuntos es un algoritmo que convierte un autómata finito no determinista (AFND) en un autómata finito determinista (AFD) equivalente, donde cada estado del AFD representa un subconjunto de estados del AFND.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConvert}
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-slate-950 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            {isLoading ? 'Convirtiendo...' : '🔄 Convertir a AFD'}
          </motion.button>
        </div>
      </GlassCard>

      {converted && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard title="AFND Original" subtitle="Autómata no determinista" gradient="from-purple-500 to-pink-500">
              <div className="h-96 rounded-2xl border border-slate-700/50 bg-slate-950/50 overflow-hidden">
                <AutomataDiagram automaton={automaton} />
              </div>
            </GlassCard>

            <GlassCard title="AFD Resultante" subtitle="Autómata determinista equivalente" gradient="from-cyan-500 to-blue-500">
              <div className="h-96 rounded-2xl border border-slate-700/50 bg-slate-950/50 overflow-hidden">
                <AutomataDiagram automaton={converted} />
              </div>
            </GlassCard>
          </div>

          <GlassCard title="Estadísticas" subtitle="Comparación de autómatas" icon="📊" gradient="from-orange-500 to-red-500">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados AFND</p>
                <p className="mt-2 text-2xl font-bold text-cyan-300">{automaton.states.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Estados AFD</p>
                <p className="mt-2 text-2xl font-bold text-blue-300">{converted.states.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Transiciones AFND</p>
                <p className="mt-2 text-2xl font-bold text-purple-300">{automaton.transitions.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">Transiciones AFD</p>
                <p className="mt-2 text-2xl font-bold text-pink-300">{converted.transitions.length}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

export default ConversionPanel;
