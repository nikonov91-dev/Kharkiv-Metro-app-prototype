/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Train, 
  MapPin, 
  Navigation, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  Locate, 
  Search, 
  Volume2, 
  Eye, 
  Info,
  Calendar,
  Sun,
  Moon
} from 'lucide-react';

import { Station, LineId } from './types';
import { METRO_LINES, METRO_STATIONS, ALL_STATIONS, findStationById } from './data/metroData';

import AlertPanel from './components/AlertPanel';
import LineSelector from './components/LineSelector';
import MetroMap from './components/MetroMap';
import RoutePlanner from './components/RoutePlanner';
import StationDetails from './components/StationDetails';
import AiAssistant from './components/AiAssistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<'board' | 'planner' | 'ai'>('board');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedLine, setSelectedLine] = useState<LineId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [airRaidAlertActive, setAirRaidAlertActive] = useState<boolean>(true); // Active by default to guide users on safety details
  const [localTime, setLocalTime] = useState<string>('');
  
  // Day-Night Theme state (persists in localStorage)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('app-theme') as 'light' | 'dark') || 'dark';
  });

  // Active trains simulation
  const [activeTrains, setActiveTrains] = useState<Record<string, number>>({
    red: 10,
    blue: 7,
    green: 6
  });

  // Announcements lists
  const [announcements, setAnnouncements] = useState([
    {
      id: "ann-1",
      type: "warning",
      title: "Повітряна тривога — укриття активоване",
      message: "У випадку загрози обстрілів харківське метро функціонує як надійне та безкоштовне бомбосховище цілодобово. Поїзди продовжують курс за регламентованим інтервалом.",
      timestamp: "Щойно"
    },
    {
      id: "ann-2",
      type: "info",
      title: "Організація «Метрошколи»",
      message: "Зверніть увагу: на станціях «Університет», «Перемога» та «Академіка Барабашова» триває освітній процес у безпечних підземних куточках. Будь ласка, зберігайте спокій та взаємоповагу.",
      timestamp: "09:00"
    }
  ]);

  // Handle local time ticking
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update dynamic train statistics based on simulation parameters
  useEffect(() => {
    const hour = new Date().getHours();
    const isPeak = (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19);
    
    if (isPeak) {
      setActiveTrains({ red: 13, blue: 9, green: 8 });
    } else {
      setActiveTrains({ red: 8, blue: 6, green: 5 });
    }
  }, []);

  // Save and apply theme classes
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    const root = document.getElementById('app-root-shell');
    if (root) {
      if (theme === 'light') {
        root.classList.add('light-theme');
      } else {
        root.classList.remove('light-theme');
      }
    }
  }, [theme]);

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
  };

  const selectStationById = (id: string) => {
    const st = ALL_STATIONS.find(s => s.id === id);
    if (st) {
      setSelectedStation(st);
    }
  };

  const toggleAirRaidSimulation = () => {
    setAirRaidAlertActive(prev => {
      const nextActive = !prev;
      const timestamp = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
      if (nextActive) {
        setAnnouncements(prevAnn => [
          {
            id: `ann-${Date.now()}`,
            type: "warning",
            title: "Оголошено повітряну тривогу",
            message: "Усі станції Харківського метрополітену переходять у режим цілодобового безкоштовного бомбосховища. Рух поїздів здійснюється за графіком.",
            timestamp
          },
          ...prevAnn
        ]);
      } else {
        setAnnouncements(prevAnn => [
          {
            id: `ann-${Date.now()}`,
            type: "info",
            title: "Відбій повітряної тривоги",
            message: "Метрополітен повертається до звичайного режиму роботи. Дякуємо за порозуміння та дотримання правил безпеки.",
            timestamp
          },
          ...prevAnn
        ]);
      }
      return nextActive;
    });
  };

  // Filter stations based on selected line and search query
  const filteredStations = ALL_STATIONS.filter(station => {
    const matchesLine = selectedLine === 'all' || station.lineId === selectedLine;
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          station.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLine && matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-theme-bg text-theme-text font-sans leading-relaxed selection:bg-[#00AEEF]/30 flex flex-col ${theme === 'light' ? 'light-theme' : ''}`} id="app-root-shell">
      
      {/* City Support Top Banner Info */}
      <div className="bg-theme-bg text-theme-text-muted text-center py-2 text-[10.5px] font-mono tracking-tight uppercase px-4 flex items-center justify-center space-x-2 border-b border-theme-border" id="top-badge-announcement">
        <span className="inline-block w-2 h-2 bg-rose-550 rounded-full shadow-[0_0_6px_#ef4444] animate-pulse" />
        <span className="font-semibold text-theme-text-muted">Харків — місто-герой. Наш транспортний помічник діє для вашої безпеки та зручності.</span>
      </div>

      {/* Main Header */}
      <header className="bg-theme-card border-b border-theme-border sticky top-0 z-30 shadow-xs" id="app-main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4" id="header-container-inside">
          
          <div className="flex items-center space-x-3" id="branding-zone">
            <div className="p-2 bg-[#00AEEF]/10 border border-[#00AEEF]/25 text-[#00AEEF] rounded-md shadow-sm flex items-center justify-center shrink-0" id="brand-train-icon">
              <Train size={22} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-bold text-theme-text tracking-wider uppercase font-mono" id="main-brand-title">МЕТРОПОЛІТЕН ХАРКОВА</h1>
                <span className="text-[9px] bg-rose-500/10 text-rose-450 border border-rose-500/30 font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">LIVE розклад</span>
              </div>
              <p className="text-[11px] text-theme-text-muted font-sans">Моніторинг поїздів, безпека укриття та розумний навігатор</p>
            </div>
          </div>

          {/* Clock, Curfew & Day/Night Toggle Details */}
          <div className="flex items-center space-x-4 text-xs font-bold text-theme-text-muted" id="live-telemetry-panel">
            <div className="hidden sm:block text-right" id="local-date-box">
              <span className="text-[9px] text-theme-text-dim font-mono uppercase block leading-none">СЬОГОДНІ</span>
              <span className="text-theme-text font-mono">25 Травня, 2026</span>
            </div>
            
            <div className="h-8 w-[1px] bg-theme-border hidden sm:block" />

            <div className="text-right" id="real-time-clock">
              <span className="text-[9px] text-[#00AEEF] font-bold uppercase font-mono block leading-none">ЧАС У МІСТІ</span>
              <span className="text-[#00AEEF] text-sm font-black font-mono tracking-wider">{localTime || '09:01:44'}</span>
            </div>

            <div className="h-8 w-[1px] bg-theme-border" />

            {/* Day / Night Theme Toggler */}
            <button
              id="theme-toggle-button"
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-lg bg-theme-input hover:bg-theme-card border border-theme-border text-theme-text-muted hover:text-[#00AEEF] transition-all cursor-pointer flex items-center justify-center shadow-2xs"
              title={theme === 'dark' ? 'Перемкнути на світлий режим' : 'Перемкнути на темний режим'}
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-amber-500 animate-spin-slow" />
              ) : (
                <Moon size={15} className="text-blue-600" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Primary Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col space-y-4" id="app-main-content">
        
        {/* Alerts and Simulators */}
        <AlertPanel 
          announcements={announcements} 
          airRaidActive={airRaidAlertActive}
          onToggleAlertMode={toggleAirRaidSimulation}
        />

        {/* Tab Selection Row */}
        <div className="bg-theme-card p-1 rounded-md border border-theme-border shadow-2xs flex space-x-1 shrink-0" id="dashboard-tabs-navigator">
          <button
            id="tab-button-board"
            onClick={() => setActiveTab('board')}
            className={`flex-1 py-2.5 text-xs font-bold rounded transition-all flex items-center justify-center space-x-2 cursor-pointer font-mono uppercase ${
              activeTab === 'board'
                ? 'bg-[#00AEEF]/20 border border-[#00AEEF]/35 text-theme-text shadow-xs font-black'
                : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-input border border-transparent'
            }`}
          >
            <Train size={14} />
            <span>ТАБЛО ТА СХЕМА КОЛІЙ</span>
          </button>

          <button
            id="tab-button-planner"
            onClick={() => setActiveTab('planner')}
            className={`flex-1 py-2.5 text-xs font-bold rounded transition-all flex items-center justify-center space-x-2 cursor-pointer font-mono uppercase ${
              activeTab === 'planner'
                ? 'bg-[#00AEEF]/20 border border-[#00AEEF]/35 text-theme-text shadow-xs font-black'
                : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-input border border-transparent'
            }`}
          >
            <Navigation size={14} />
            <span>РОЗРАХУНОК МАРШРУТУ</span>
          </button>

          <button
            id="tab-button-ai"
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-2.5 text-xs font-bold rounded transition-all flex items-center justify-center space-x-2 cursor-pointer font-mono uppercase ${
              activeTab === 'ai'
                ? 'bg-[#00AEEF]/20 border border-[#00AEEF]/35 text-theme-text shadow-xs font-black'
                : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-input border border-transparent'
            }`}
          >
            <Sparkles size={14} />
            <span>ПАСАЖИРСЬКИЙ ПОМІЧНИК AI</span>
          </button>
        </div>

        {/* TAB 1: BOARD AND INTERACTIVE METRO MAP */}
        {activeTab === 'board' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch" id="tab-board-grid">
            
            {/* Map and Line Filter Block (Left 2 columns on large screens) */}
            <div className="lg:col-span-2 flex flex-col space-y-4" id="board-left-column">
              
              <LineSelector 
                selectedLine={selectedLine}
                onLineChange={setSelectedLine}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeTrainCount={activeTrains}
              />

              <MetroMap 
                stations={METRO_STATIONS}
                onStationSelect={handleStationSelect}
                selectedStationId={selectedStation?.id}
              />

              {/* Station Quick List Result Filter */}
              {searchQuery && (
                <div className="bg-theme-card p-4 rounded-lg border border-theme-border space-y-2 animate-fade-in" id="station-quick-results">
                  <h4 className="text-[10px] font-mono font-bold text-theme-text-muted uppercase tracking-widest">Результати пошуку ({filteredStations.length})</h4>
                  {filteredStations.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" id="filtered-station-buttons-wrapper">
                      {filteredStations.map(st => {
                        const line = METRO_LINES.find(l => l.id === st.lineId);
                        
                        // Icon dot selection color in helper
                        let dotColor = 'bg-red-500';
                        if (st.lineId === 'blue') dotColor = 'bg-[#00AEEF]';
                        if (st.lineId === 'green') dotColor = 'bg-emerald-500';

                        return (
                          <button
                            key={st.id}
                            id={`quick-result-stat-${st.id}`}
                            onClick={() => handleStationSelect(st)}
                            className="text-left p-2.5 bg-theme-input hover:bg-theme-card rounded border border-theme-border text-xs font-semibold flex items-center space-x-2 border transition-colors cursor-pointer text-theme-text"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                            <span className="truncate">{st.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-theme-text-dim italic">Жодних станцій не знайдено. Спробуйте іншу назву.</p>
                  )}
                </div>
              )}

            </div>

            {/* Timetable Predictions and Shelters details (Right 1 column) */}
            <div className="lg:col-span-1 flex flex-col" id="board-right-column">
              <StationDetails 
                station={selectedStation} 
                onSelectStationById={selectStationById}
                airRaidActive={airRaidAlertActive}
              />
            </div>

          </div>
        )}

        {/* TAB 2: ROUTE ITINERARY CALCULATOR */}
        {activeTab === 'planner' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start" id="tab-planner-layout">
            <div className="lg:col-span-2" id="planner-main-column">
              <RoutePlanner 
                stations={ALL_STATIONS} 
                onSelectStationById={(id) => {
                  selectStationById(id);
                  setActiveTab('board');
                }}
              />
            </div>

            <div className="lg:col-span-1 bg-theme-card p-4 rounded-lg border border-theme-border shadow-xs space-y-4" id="planner-sidebar-column">
              <h4 className="text-xs font-mono font-bold text-theme-text uppercase tracking-widest flex items-center space-x-1.5" id="planner-tips-heading">
                <Info size={14} className="text-[#00AEEF]" />
                <span>ЯК КОРИСТУВАТИСЬ ПЕРЕСАДКАМИ?</span>
              </h4>
              
              <p className="text-[11.5px] text-theme-text-muted leading-relaxed font-sans">
                У харківській підземці всі три пересадочні вузли сполучені закритими підземними укритими пішохідними тунелями у центрі міста.
              </p>

              <div className="border-t border-theme-border pt-3.5 space-y-3.5 text-xs" id="transfers-guides-list">
                <div className="flex items-start space-x-1.5" id="tr-guid-1">
                  <span className="text-red-500 font-bold font-mono">L1↔L2</span>
                  <div>
                    <span className="font-bold text-theme-text">Майдан Конституції ↔ Історичний Музей</span>
                    <p className="text-theme-text-muted font-sans text-[11px] mt-0.5">Найпопулярніший перехід між Червоною та Синьою лініями.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-1.5" id="tr-guid-2">
                  <span className="text-[#00AEEF] font-bold font-mono">L2↔L3</span>
                  <div>
                    <span className="font-bold text-theme-text">Університет ↔ Держпром</span>
                    <p className="text-theme-text-muted font-sans text-[11px] mt-0.5">Швидкий перехід на площі Свободи. Сполучає Сині та Зелені рейси.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-1.5" id="tr-guid-3">
                  <span className="text-emerald-500 font-bold font-mono">L1↔L3</span>
                  <div>
                    <span className="font-bold text-theme-text">Спортивна ↔ Метробудівників</span>
                    <p className="text-theme-text-muted font-sans text-[11px] mt-0.5">Перехід біля стадіону «Металіст». Сполучає Червону й Зелену лінії.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Conversational Passenger Companion via Gemini AI */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start" id="tab-ai-layout">
            
            <div className="lg:col-span-3" id="ai-assistant-wrapper">
              <AiAssistant />
            </div>

            <div className="lg:col-span-1 bg-theme-card p-4 rounded-lg border border-theme-border shadow-xs space-y-4 text-xs text-theme-text-muted" id="ai-sidebar-tips">
              <div className="flex items-center space-x-2 text-theme-text font-mono uppercase tracking-wider font-bold border-b border-theme-border pb-2">
                <Sparkles size={14} className="text-[#00AEEF] shrink-0" />
                <span>Метрошкола та Безпека</span>
              </div>
              
              <div className="space-y-3.5" id="ai-safety-info">
                <div>
                  <span className="font-bold text-theme-text uppercase tracking-wide text-[10px] font-mono block">🎓 НАВІЩО ВЕСТИ МЕТРОШКОЛУ?</span>
                  <p className="text-theme-text-muted mt-1 font-sans leading-relaxed text-[11px]">
                    Через щоденні виклики безпеки на класичній наземній інфраструктурі, місто розбудувало понад 60 стерильних вентильованих кабінетів на станціях для повноцінного занять та захисту дітей Харкова.
                  </p>
                </div>

                <div>
                  <span className="font-bold text-theme-text uppercase tracking-wide text-[10px] font-mono block">⛽ ГЕНЕРАТОРИ & ЖИВЛЕННЯ</span>
                  <p className="text-theme-text-muted mt-1 font-sans leading-relaxed text-[11px]">
                    Всі станції оснащені промисловими автоматичними електрогенераторами, системами питної фільтрації та мобільними зонами USB-живлення.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Page Footer */}
      <footer className="bg-theme-card border-t border-theme-border py-5 mt-12 shrink-0 text-center" id="app-footer-bar">
        <div className="max-w-7xl mx-auto px-4 text-xs text-theme-text-muted space-y-2" id="footer-inner">
          <p className="font-medium text-theme-text-muted font-sans text-[11px]">
            БЕЗПЕЧНИЙ ПАСАЖИРСЬКИЙ МОНІТОР ХАРКІВСЬКОГО МЕТРОПОЛІТЕНУ — Створено для допомоги та орієнтування мешканців умов воєнного часу.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 text-[9.5px] font-mono uppercase text-theme-text-dim tracking-wider" id="metadata-tags">
            <span>Статус: ONLINE_SECURE</span>
            <span>Резервне живлення: АКТИВНЕ</span>
            <span>Зв&apos;язок ДСНС Харків: ПІДКЛЮЧЕНО</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
