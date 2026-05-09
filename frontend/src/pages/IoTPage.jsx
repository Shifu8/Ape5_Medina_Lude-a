import React from 'react';
import ProblemPage from './ProblemPage';
import { iotAutomaton } from '../data/automatas';

function IoTPage() {
  return (
    <ProblemPage
      automaton={iotAutomaton}
      title="IoT Autómata"
      subtitle="Autómata finito no determinista para validación de mensajes IoT"
      icon="🔌"
    />
  );
}

export default IoTPage;
