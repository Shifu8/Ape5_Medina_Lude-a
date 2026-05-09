import React from 'react';

function Card({ title, children }) {
  return (
    <section className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl shadow-black/20">
      {title && <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default Card;
