/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Info, X, Zap, Clock, GraduationCap } from 'lucide-react';

interface Announcement {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
}

interface AlertPanelProps {
  announcements: Announcement[];
  onToggleAlertMode?: () => void;
  airRaidActive: boolean;
}

export default function AlertPanel({ announcements, onToggleAlertMode, airRaidActive }: AlertPanelProps) {
  const [closedIds, setClosedIds] = useState<string[]>([]);

  const visibleAnnouncements = announcements.filter(a => !closedIds.includes(a.id));

  return (
    <div className="space-y-3" id="alert-panel-container">
      {/* Real-time Status Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="quick-stats-grid">
        <div 
          onClick={onToggleAlertMode}
          className={`cursor-pointer transition-all duration-300 p-3 rounded-lg border flex items-center justify-between ${
            airRaidActive 
              ? 'bg-red-950/20 border-red-500/40 hover:bg-red-950/30 text-rose-100' 
              : 'bg-emerald-950/20 border-emerald-550/40 hover:bg-emerald-950/30 text-emerald-100'
          }`}
          id="air-raid-status-stat"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-md ${airRaidActive ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500 text-white'}`}>
              <ShieldAlert size={16} />
            </div>
            <div>
              <p className="text-[10px] text-theme-text-muted uppercase tracking-wider font-mono">ПОВІТРЯНА ТРИВОГА</p>
              <h4 className={`text-xs font-bold font-mono tracking-tight ${airRaidActive ? 'text-red-400' : 'text-emerald-500'}`}>
                {airRaidActive ? '🔴 АКТИВНА / УКРИТТЯ 24/7' : '🟢 ВІДБІЙ / ШТАТНИЙ РЕЖИМ'}
              </h4>
            </div>
          </div>
          <span className="text-[9px] font-bold px-2 py-1 rounded bg-theme-input border border-theme-border text-theme-text-muted hover:text-theme-text transition-colors">
            {airRaidActive ? 'Змінити симуляцію' : 'Увімкнути тривогу'}
          </span>
         </div>

        <div className="p-3 rounded-lg bg-theme-input/40 border border-theme-border flex items-center space-x-3" id="curfew-status-stat">
          <div className="p-2 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-500 shrink-0">
            <Clock size={16} />
          </div>
          <div>
            <p className="text-[10px] text-theme-text-muted uppercase tracking-wider font-mono">КОМЕНДАНТСЬКА ГОДИНА</p>
            <h4 className="text-xs font-bold text-amber-500 font-mono">23:00 — 05:00 (Метро зачинене для транзиту)</h4>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-theme-input/40 border border-theme-border flex items-center space-x-3" id="power-grid-stat">
          <div className="p-2 rounded-md bg-[#00AEEF]/20 border border-[#00AEEF]/40 text-[#00AEEF] shrink-0">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-[10px] text-theme-text-muted uppercase tracking-wider font-mono">ЕНЕРГОПОСТАЧАННЯ ЛІНІЙ</p>
            <h4 className="text-xs font-bold text-[#00AEEF] font-mono">100% СТАБІЛЬНЕ (РЕЗЕРВОВАНЕ)</h4>
          </div>
        </div>
      </div>

      {airRaidActive && (
        <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/30 text-white shadow-md flex items-start space-x-3 relative overflow-hidden animate-fade-in" id="alert-banner-top">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="p-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-md shrink-0">
            <ShieldAlert size={18} className="animate-bounce" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-red-200 uppercase tracking-wide">Режим безпекового укриття активований цілодобово</h3>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              На період загрози вхід до підземних зон відкритий. Проїзд за вказаним лінійним графіком продовжується. Будь ласка, дотримуйтесь вказівок ДСНС та чергових офіцерів станції. Усі лінії обладнані автономними генераторами живлення та життєдіяльності.
            </p>
          </div>
        </div>
      )}

      {/* Announcements */}
      {visibleAnnouncements.length > 0 && (
        <div className="space-y-2" id="announcements-wrapper">
          {visibleAnnouncements.map((ann) => (
            <div 
              key={ann.id}
              className={`p-3 rounded-lg border flex items-start space-x-3 relative transition-all duration-200 ${
                ann.type === 'warning' 
                  ? 'bg-red-950/15 border-red-900/40 text-red-200' 
                  : 'bg-theme-input/20 border-theme-border text-theme-text-muted'
              }`}
              id={`announcement-${ann.id}`}
            >
              <div className={`p-1.5 rounded-md shrink-0 ${ann.type === 'warning' ? 'bg-red-550/20 text-red-400 border border-red-500/30' : 'bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20'}`}>
                {ann.type === 'warning' ? <ShieldAlert size={14} /> : <GraduationCap size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-xs text-theme-text">{ann.title}</h4>
                  <span className="text-[9px] text-theme-text-muted font-mono bg-theme-input px-1.5 py-0.5 rounded border border-theme-border">{ann.timestamp}</span>
                </div>
                <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">{ann.message}</p>
              </div>
              <button 
                onClick={() => setClosedIds(prev => [...prev, ann.id])}
                className="text-theme-text-dim hover:text-theme-text p-1 rounded-full transition-colors shrink-0 cursor-pointer"
                id={`dismiss-announcement-button-${ann.id}`}
                title="Закрити"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
