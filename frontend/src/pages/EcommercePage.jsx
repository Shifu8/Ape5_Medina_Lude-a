import React from 'react';
import ProblemPage from './ProblemPage';
import { ecommerceAutomaton } from '../data/automatas';

function EcommercePage() {
  return (
    <ProblemPage
      automaton={ecommerceAutomaton}
      title="Ecommerce Autómata"
      subtitle="Autómata finito no determinista para validación de procesos de compra"
      icon="🛍️"
    />
  );
}

export default EcommercePage;
