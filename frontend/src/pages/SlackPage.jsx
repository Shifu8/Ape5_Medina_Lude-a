import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTabs from '../components/ui/AnimatedTabs';
import AutomataVisualization from '../components/sections/AutomataVisualization';
import MinimizationPanel from '../components/sections/MinimizationPanel';
import { slackAutomaton } from '../data/automatas';
import { convertAutomaton, minimizeAutomatonDetailed } from '../services/api';

function SlackPage() {
  const [automaton] = useState(slackAutomaton);
  const [activeTab, setActiveTab] = useState('visualization');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'visualization', label: '📊 Visualización' },
    { id: 'minimization', label: '⚡ Minimización' },
  ];

  const handleMinimize = async () => {
    try {
      setError(null);
      setLoading(true);
      const dfa = automaton.states.length > 0 ? automaton : await convertAutomaton(automaton);
      if (!dfa) throw new Error('Conversión falló');
      const details = await minimizeAutomatonDetailed(dfa);
      return { minimized: details.minimizedAutomaton, details };
    } catch (err) {
      setError('Error al minimizar.');
      return { minimized: null, details: null };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
          Slack Bot Autómata
        </h1>
        <p className="text-slate-400">Autómata finito determinista para validación de comandos</p>
      </motion.div>

      {/* Tabs */}
      <AnimatedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenido */}
      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {activeTab === 'visualization' && (
          <AutomataVisualization
            automaton={automaton}
            title="Slack - AFD"
            subtitle="Autómata determinista"
            icon="💬"
          />
        )}

        {activeTab === 'minimization' && (
          <MinimizationPanel automaton={automaton} onMinimize={handleMinimize} isLoading={loading} />
        )}
      </motion.div>
    </div>
  );
}

export default SlackPage;
