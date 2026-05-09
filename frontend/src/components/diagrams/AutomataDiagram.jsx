import React, { useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

function AutomataDiagram({ automaton }) {
  const nodes = useMemo(() => {
    if (!automaton) return [];

    const finalStates = Array.isArray(automaton.finalStates) ? automaton.finalStates : Array.from(automaton.finalStates || []);

    return automaton.states.map((state, index) => {
      const isInitial = automaton.initialState === state;
      const isFinal = finalStates.includes(state);
      const position = automaton.positions?.[state] || { x: 200 * (index % 4), y: 140 * Math.floor(index / 4) };

      return {
        id: state,
        data: { label: state },
        position,
        style: {
          width: 110,
          height: 110,
          borderRadius: '50%',
          border: isInitial ? '3px solid #38bdf8' : isFinal ? '3px solid #22c55e' : '1px solid #64748b',
          boxShadow: isFinal ? '0 0 0 6px rgba(34, 197, 94, 0.18)' : 'none',
          background: '#0f172a',
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'center',
          padding: '8px',
        },
      };
    });
  }, [automaton]);

  const edges = useMemo(() => {
    if (!automaton) return [];
    return automaton.transitions.map((transition, index) => ({
      id: `edge-${index}`,
      source: transition.source,
      target: transition.target,
      label: transition.symbol,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#38bdf8' },
      markerEnd: {
        type: 'arrowclosed',
        color: '#38bdf8',
      },
      labelStyle: { fill: '#f8fafc', fontSize: 12, fontWeight: 600 },
      labelBgStyle: { fill: '#111827', fillOpacity: 0.9 },
      labelBgPadding: [6, 4],
      labelBgBorderRadius: 4,
    }));
  }, [automaton]);

  return (
    <div className="h-[420px] rounded-3xl border border-slate-700 bg-slate-950 p-4 shadow-xl shadow-black/20">
      <ReactFlow nodes={nodes} edges={edges} fitView fitViewOptions={{ padding: 0.2 }} attributionPosition="bottom-left">
        <MiniMap zoomable pannable nodeColor={() => '#22c55e'} />
        <Controls />
        <Background gap={20} size={1} color="#334155" />
      </ReactFlow>
    </div>
  );
}

export default AutomataDiagram;
