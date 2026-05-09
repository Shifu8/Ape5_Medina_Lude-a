import React from 'react';
import { motion } from 'framer-motion';

function GlassCard({ title, subtitle, children, icon, gradient = 'from-cyan-500 to-blue-500' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/30 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r ${gradient}`} style={{ opacity: 0.05 }} />
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
        background: `linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(59, 130, 246, 0.1))`,
        borderRadius: 'inherit',
      }} />

      <div className="relative z-10">
        {(title || icon) && (
          <div className="mb-4 flex items-center gap-3">
            {icon && <div className="text-3xl">{icon}</div>}
            {title && (
              <div>
                <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
              </div>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </motion.div>
  );
}

export default GlassCard;
