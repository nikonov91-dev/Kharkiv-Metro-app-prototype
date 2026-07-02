/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Train, Award, Map } from 'lucide-react';
import { LineId } from '../types';

interface LineSelectorProps {
  selectedLine: LineId | 'all';
  onLineChange: (line: LineId | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTrainCount: Record<string, number>;
}

export default function LineSelector({
  selectedLine,
  onLineChange,
  searchQuery,
  onSearchChange,
  activeTrainCount
}: LineSelectorProps) {
  return (
    <div className="bg-theme-card p-3.5 rounded-lg border border-theme-border shadow-xs space-y-3.5" id="line-selector-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3" id="filters-top-header">
        <div>
          <h3 className="text-sm font-bold text-theme-text flex items-center space-x-2" id="lines-title">
            <Train size={15} className="text-[#00AEEF]" />
            <span className="tracking-tight uppercase text-xs font-mono">ЛІНІЇ ПІДЗЕМКИ ХАРКОВА</span>
          </h3>
          <p className="text-[11px] text-theme-text-muted mt-0.5 font-sans">Оберіть фільтр за колією або скористайтеся живим пошуком</p>
        </div>

        {/* Search Station Input */}
        <div className="relative flex-1 md:max-w-xs" id="station-search-container">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted" id="search-icon-svg" />
          <input
            id="station-search-input"
            type="text"
            placeholder="Введіть назву станції для пошуку..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-theme-input border border-theme-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#00AEEF]/40 focus:border-[#00AEEF] transition-all font-mono text-theme-text placeholder:text-theme-text-dim/60"
          />
        </div>
      </div>

      {/* Line buttons layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" id="line-filter-buttons-grid">
        <button
          id="line-button-all"
          onClick={() => onLineChange('all')}
          className={`flex items-center justify-between p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
            selectedLine === 'all'
              ? 'bg-[#00AEEF]/20 border-[#00AEEF]/55 text-theme-text font-bold ring-1 ring-[#00AEEF]/30'
              : 'bg-theme-input/40 hover:bg-theme-input/80 border-theme-border text-theme-text-muted'
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase tracking-wide block opacity-75 font-mono">ФІЛЬТР: УСІ</span>
            <span className="text-xs font-bold text-theme-text">Усі 3 лінії</span>
          </div>
          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${selectedLine === 'all' ? 'bg-[#00AEEF]/30 text-[#00AEEF]' : 'bg-theme-input text-theme-text-dim border border-theme-border/60'}`}>
            30 ст.
          </span>
        </button>

        <button
          id="line-button-red"
          onClick={() => onLineChange('red')}
          className={`flex items-center justify-between p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
            selectedLine === 'red'
              ? 'bg-red-950/20 border-red-500/60 ring-1 ring-red-500/30 text-theme-text font-bold'
              : 'bg-theme-input/40 hover:bg-theme-input/80 border-theme-border text-theme-text-muted'
          }`}
        >
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-550 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <span className="text-[9px] uppercase tracking-wide block text-red-500 font-bold font-mono">ЧЕРВОНА - L1</span>
            </div>
            <span className="text-xs font-bold block truncate max-w-[125px] text-theme-text">Холодногірсько-Зав.</span>
          </div>
          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${selectedLine === 'red' ? 'bg-red-500/20 text-red-450 border border-red-500/30' : 'bg-theme-input text-theme-text-dim border border-theme-border/60'}`}>
            {activeTrainCount.red} поїзд.
          </span>
        </button>

        <button
          id="line-button-blue"
          onClick={() => onLineChange('blue')}
          className={`flex items-center justify-between p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
            selectedLine === 'blue'
              ? 'bg-[#00AEEF]/20 border-[#00AEEF]/60 ring-1 ring-[#00AEEF]/30 text-theme-text font-bold'
              : 'bg-theme-input/40 hover:bg-theme-input/80 border-theme-border text-theme-text-muted'
          }`}
        >
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_6px_rgba(0,174,239,0.8)]" />
              <span className="text-[9px] uppercase tracking-wide block text-[#00AEEF] font-bold font-mono">СИНЯ - L2</span>
            </div>
            <span className="text-xs font-bold block text-theme-text">Салтівська</span>
          </div>
          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${selectedLine === 'blue' ? 'bg-[#00AEEF]/20 text-[#00AEEF]' : 'bg-theme-input text-theme-text-dim border border-theme-border/60'}`}>
            {activeTrainCount.blue} поїзд.
          </span>
        </button>

        <button
          id="line-button-green"
          onClick={() => onLineChange('green')}
          className={`flex items-center justify-between p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
            selectedLine === 'green'
              ? 'bg-emerald-950/20 border-emerald-500/60 ring-1 ring-emerald-500/30 text-theme-text font-bold'
              : 'bg-theme-input/40 hover:bg-theme-input/80 border-theme-border text-theme-text-muted'
          }`}
        >
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-555 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span className="text-[9px] uppercase tracking-wide block text-emerald-400 font-bold font-mono">ЗЕЛЕНА - L3</span>
            </div>
            <span className="text-xs font-bold block text-theme-text">Олексіївська</span>
          </div>
          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${selectedLine === 'green' ? 'bg-emerald-500/20 text-emerald-450 border border-emerald-500/30' : 'bg-theme-input text-theme-text-dim border border-theme-border/60'}`}>
            {activeTrainCount.green} поїзд.
          </span>
        </button>
      </div>
    </div>
  );
}
