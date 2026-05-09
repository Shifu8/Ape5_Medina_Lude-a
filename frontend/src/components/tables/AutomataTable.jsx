import React from 'react';

function AutomataTable({ automaton }) {
  if (!automaton) {
    return <p className="text-slate-400">Cargue un autómata para ver la tabla de estados.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-700 bg-slate-900 p-4">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400">
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Símbolo</th>
            <th className="px-4 py-3">Destino</th>
          </tr>
        </thead>
        <tbody>
          {automaton.transitions.map((transition, index) => (
            <tr key={index} className="border-b border-slate-800 hover:bg-slate-950/70">
              <td className="px-4 py-3">{transition.source}</td>
              <td className="px-4 py-3">{transition.symbol}</td>
              <td className="px-4 py-3">{transition.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutomataTable;
