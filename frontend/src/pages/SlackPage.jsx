import React from 'react';
import ProblemPage from './ProblemPage';
import { slackAutomaton } from '../data/automatas';

function SlackPage() {
  return (
    <ProblemPage
      automaton={slackAutomaton}
      title="Slack Bot Autómata"
      subtitle="Autómata finito determinista para validación de comandos"
      icon="💬"
    />
  );
}

export default SlackPage;
