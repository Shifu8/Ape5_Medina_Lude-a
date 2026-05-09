import axios from 'axios';

const api = axios.create({
  baseURL: '/api/automata',
  headers: { 'Content-Type': 'application/json' },
});

export async function convertAutomaton(automaton) {
  const response = await api.post('/convert', automaton);
  return response.data.automaton;
}

export async function minimizeAutomaton(automaton) {
  const response = await api.post('/minimize', automaton);
  return response.data.automaton;
}

export async function simulateAutomaton(automaton, input) {
  const response = await api.post('/simulate', { automaton, input });
  return response.data;
}

export async function simulateAutomatonComparison(automaton, input) {
  const response = await api.post('/simulate/comparison', { automaton, input });
  return response.data;
}

export async function compareAutomata(automaton) {
  const response = await api.post('/compare', automaton);
  return response.data;
}

export async function minimizeAutomatonDetailed(automaton) {
  const response = await api.post('/minimize/details', automaton);
  return response.data;
}
