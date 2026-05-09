import React from 'react';
import { motion } from 'framer-motion';

function AnimatedTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 p-2 backdrop-blur-sm">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative px-6 py-3 text-sm font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className={activeTab === tab.id ? 'relative text-cyan-100' : 'relative text-slate-400'}>
            {tab.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default AnimatedTabs;
