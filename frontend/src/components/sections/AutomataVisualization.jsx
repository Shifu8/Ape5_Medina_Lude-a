import React from 'react';
import GlassCard from '../ui/GlassCard';
import AutomataDiagram from '../diagrams/AutomataDiagram';
import AutomataTable from '../tables/AutomataTable';

function AutomataVisualization({ automaton, title, subtitle, icon }) {
  return (
    <div className="space-y-6">
      <GlassCard title={title} subtitle={subtitle} icon={icon}>
        <p className="text-sm text-slate-400">{automaton.description}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
            <h4 className="text-xs uppercase tracking-widest text-cyan-300">Expresión regular</h4>
            <p className="mt-2 text-sm text-slate-100">{automaton.regex}</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
            <h4 className="text-xs uppercase tracking-widest text-cyan-300">Alfabeto</h4>
            <p className="mt-2 text-sm text-slate-100">{Array.from(automaton.alphabet).join(', ')}</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard title="Diagrama" subtitle="Visualización del autómata" gradient="from-blue-500 to-purple-500">
          <div className="h-96 rounded-2xl border border-slate-700/50 bg-slate-950/50 overflow-hidden">
            <AutomataDiagram automaton={automaton} />
          </div>
        </GlassCard>

        <div className="lg:col-span-2">
          <GlassCard title="Tabla de transiciones" subtitle="Estados y símbolos" gradient="from-purple-500 to-pink-500">
            <div className="max-h-96 overflow-auto">
              <AutomataTable automaton={automaton} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default AutomataVisualization;
