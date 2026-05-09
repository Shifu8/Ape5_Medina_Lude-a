import React from 'react';

function MainLayout({ children }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Teoría de Autómatas</p>
            <h1 className="text-3xl font-semibold text-white">Laboratorio de AFND, AFD y Minimización</h1>
          </div>
          <p className="max-w-xl text-slate-400">Arquitectura modular con separación de presentación, servicios e algoritmos. Carga los autómatas, simula cadenas y compara resultados.</p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
