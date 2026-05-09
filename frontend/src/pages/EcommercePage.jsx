import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTabs from '../components/ui/AnimatedTabs';
import AutomataVisualization from '../components/sections/AutomataVisualization';
import ConversionPanel from '../components/sections/ConversionPanel';
import { ecommerceAutomaton } from '../data/automatas';
import { convertAutomaton } from '../services/api';

function EcommercePage() {
  const [automaton] = useState(ecommerceAutomaton);
  const [activeTab, setActiveTab] = useState('visualization');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'visualization', label: '📊 Visualización' },
    { id: 'conversion', label: '🔄 Conversión' },
  ];

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

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
          Ecommerce Autómata
        </h1>
        <p className="text-slate-400">Autómata finito para validación de procesos de compra</p>
      </motion.div>

      {/* Tabs */}
      <AnimatedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenido */}
      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {activeTab === 'visualization' && (
          <AutomataVisualization
            automaton={automaton}
            title="Ecommerce - AFND"
            subtitle="Autómata no determinista"
            icon="🛍️"
          />
        )}

        {activeTab === 'conversion' && (
          <ConversionPanel automaton={automaton} onConvert={handleConvert} isLoading={loading} />
        )}
      </motion.div>
    </div>
  );
}

export default EcommercePage;
