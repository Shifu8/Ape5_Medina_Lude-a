export function formatSetValues(values) {
  if (!values) return '';
  if (Array.isArray(values)) {
    return values.join(', ');
  }
  return Array.from(values).join(', ');
}

export function buildFlowNodes(automaton) {
  if (!automaton) return [];
  return Array.from(automaton.states).map((state, index) => ({
    id: state,
    data: { label: state },
    position: { x: 200 * (index % 4), y: 130 * Math.floor(index / 4) },
  }));
}

export function buildFlowEdges(automaton) {
  if (!automaton) return [];
  return automaton.transitions.map((transition, idx) => ({
    id: `edge-${idx}`,
    source: transition.source,
    target: transition.target,
    label: transition.symbol,
    animated: true,
    style: { stroke: '#22d3ee' },
    labelStyle: { fill: '#f8fafc', fontSize: 12 },
  }));
}
