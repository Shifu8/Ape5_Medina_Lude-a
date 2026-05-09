import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTabs from '../components/ui/AnimatedTabs';
import AutomataVisualization from '../components/sections/AutomataVisualization';
import ConversionPanel from '../components/sections/ConversionPanel';
import MinimizationPanel from '../components/sections/MinimizationPanel';
import SimulationPanel from '../components/sections/SimulationPanel';
import { iotAutomaton } from '../data/automatas';
import { convertAutomaton, minimizeAutomatonDetailed, simulateAutomatonComparison } from '../services/api';

function IoTPage() {
  const [automaton] = useState(iotAutomaton);
  const [activeTab, setActiveTab] = useState('visualization');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'visualization', label: '📊 Visualización' },
    { id: 'conversion', label: '🔄 Conversión' },
    { id: 'minimization', label: '⚡ Minimización' },
    { id: 'simulation', label: '▶️ Simulación' },
  ];

  const handleSimulate = async (input) => {
    try {
      setError(null);
      setLoading(true);
      const result = await simulateAutomatonComparison(automaton, input);
      setComparison(result);
    } catch (err) {
      setError('Error al simular. Verifique la cadena.');
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await convertAutomaton(automaton);
      return result;
    } catch (err) {
      setError('Error al convertir.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleMinimize = async () => {
    try {
      setError(null);
      setLoading(true);
      const dfa = await convertAutomaton(automaton);
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          IoT Autómata
        </h1>
        <p className="text-slate-400">Autómata finito no determinista para validación de mensajes IoT</p>
      </motion.div>

      {/* Tabs */}
      <AnimatedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenido */}
      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {activeTab === 'visualization' && (
          <AutomataVisualization
            automaton={automaton}
            title="AFND - IoT"
            subtitle="Autómata no determinista"
            icon="🔌"
          />
        )}

        {activeTab === 'conversion' && (
          <ConversionPanel automaton={automaton} onConvert={handleConvert} isLoading={loading} />
        )}

        {activeTab === 'minimization' && (
          <MinimizationPanel automaton={automaton} onMinimize={handleMinimize} isLoading={loading} />
        )}

        {activeTab === 'simulation' && (
          <SimulationPanel onSimulate={handleSimulate} comparison={comparison} isLoading={loading} error={error} />
        )}
      </motion.div>
    </div>
  );
}

export default IoTPage;
