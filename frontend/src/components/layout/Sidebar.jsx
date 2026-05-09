import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Sidebar() {
  const navItems = [
    { to: '/', label: 'IoT AFND', icon: '🔌' },
    { to: '/ecommerce', label: 'Ecommerce AFD', icon: '🛍️' },
    { to: '/slack', label: 'Slack Minimización', icon: '💬' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 border-r border-slate-700 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Automata
        </h1>
        <p className="mt-1 text-xs text-slate-500">Plataforma académica</p>
      </motion.div>

      <nav className="space-y-3">
        {navItems.map((item, idx) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block w-full rounded-2xl px-4 py-3 text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-100 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800/50 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 left-6 right-6"
      >
        <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm">
          <p className="text-xs text-slate-400">APE5 - Teoría de Autómatas</p>
          <p className="mt-1 text-xs text-slate-500">v1.0.0</p>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export default Sidebar;
