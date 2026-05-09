import React, { useState } from 'react';
import Button from '../ui/Button';

function SimulatorPanel({ onSimulate }) {
  const [input, setInput] = useState('');

  return (
    <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-900 p-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Cadena de prueba</label>
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ej: aba"
        />
      </div>
      <Button onClick={() => onSimulate(input)}>Simular cadena</Button>
    </div>
  );
}

export default SimulatorPanel;
