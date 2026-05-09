import React from 'react';

function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
