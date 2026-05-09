import React from 'react';
import Sidebar from './Sidebar';

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1">
        <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-4 shadow-sm">
          <div className="max-w-7xl">
            <h2 className="text-xl font-semibold text-slate-100">Simulador de Autómatas</h2>
            <p className="text-sm text-slate-500">AFND → AFD → AFD Minimizado</p>
          </div>
        </div>
        <div className="overflow-auto">
          <div className="min-h-[calc(100vh-100px)] bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
