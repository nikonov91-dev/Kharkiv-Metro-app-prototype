/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeftRight, HelpCircle, Navigation, Clock, MoveRight, CornerDownRight, Landmark } from 'lucide-react';
import { Station, RouteResult } from '../types';
import { calculateRoute, METRO_LINES, findStationById } from '../data/metroData';

interface RoutePlannerProps {
  stations: Station[];
  onSelectStationById: (id: string) => void;
}

export default function RoutePlanner({ stations, onSelectStationById }: RoutePlannerProps) {
  const [startId, setStartId] = useState<string>('kholodna_hora');
  const [endId, setEndId] = useState<string>('saltivska');
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

  const sortedStations = [...stations].sort((a, b) => a.name.localeCompare(b.name));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (startId && endId) {
      const result = calculateRoute(startId, endId);
      setRouteResult(result);
    }
  };

  const handleSwap = () => {
    const temp = startId;
    setStartId(endId);
    setEndId(temp);
    if (routeResult) {
      const result = calculateRoute(endId, temp);
      setRouteResult(result);
    }
  };

  const getLineColor = (lineId?: string) => {
    if (lineId === 'red') return 'bg-red-500 border-red-500 text-red-750';
    if (lineId === 'blue') return 'bg-[#00AEEF] border-[#00AEEF] text-[#00AEEF]';
    if (lineId === 'green') return 'bg-emerald-500 border-emerald-500 text-emerald-750';
    return 'bg-neutral-700 border-neutral-700 text-neutral-400';
  };

  return (
    <div className="bg-[#121214] p-4.5 rounded-lg border border-neutral-800 shadow-xs space-y-4" id="route-planner-card">
      <div>
        <h3 className="text-sm font-bold text-white flex items-center space-x-2" id="route-planner-title">
          <Navigation size={15} className="text-[#00AEEF]" />
          <span className="font-mono uppercase text-xs tracking-tight">КАЛЬКУЛЯТОР ШВИДКИХ МАРШРУТІВ</span>
        </h3>
        <p className="text-[11px] text-neutral-500 mt-0.5">Оптимальний підрахунок переходів, станцій та розрахункового часу в дорозі</p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-3.5" id="route-planner-form">
        <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-2.5" id="route-selectors-grid">
          {/* Start Station */}
          <div className="md:col-span-3 space-y-1" id="start-station-select-group">
            <label htmlFor="route-start-select" className="text-[10px] font-mono tracking-wider font-bold text-neutral-400 uppercase block">ЗВІДКИ</label>
            <select
              id="route-start-select"
              value={startId}
              onChange={(e) => setStartId(e.target.value)}
              className="w-full text-xs bg-neutral-900/60 border border-neutral-800 rounded-md p-2 font-mono text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-[#00AEEF]/50"
            >
              {sortedStations.map((station) => (
                <option key={`start-${station.id}`} value={station.id} className="bg-neutral-950 text-neutral-200">
                  {station.name} ({station.lineId === 'red' ? 'Ч' : station.lineId === 'blue' ? 'С' : 'З'})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Trigger */}
          <div className="md:col-span-1 flex justify-center pt-2 md:pt-4" id="route-swap-container">
            <button
               id="route-swap-button"
               type="button"
               onClick={handleSwap}
               className="p-2 cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white rounded-md shadow-xs transition-all"
               title="Поміняти місцями"
            >
              <ArrowLeftRight size={14} />
            </button>
          </div>

          {/* End Station */}
          <div className="md:col-span-3 space-y-1" id="end-station-select-group">
            <label htmlFor="route-end-select" className="text-[10px] font-mono tracking-wider font-bold text-neutral-400 uppercase block">КУДИ</label>
            <select
              id="route-end-select"
              value={endId}
              onChange={(e) => setEndId(e.target.value)}
              className="w-full text-xs bg-neutral-900/60 border border-neutral-800 rounded-md p-2 font-mono text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-[#00AEEF]/50"
            >
              {sortedStations.map((station) => (
                <option key={`end-${station.id}`} value={station.id} className="bg-neutral-950 text-neutral-200">
                  {station.name} ({station.lineId === 'red' ? 'Ч' : station.lineId === 'blue' ? 'С' : 'З'})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          id="route-submit-button"
          type="submit"
          className="w-full py-2 cursor-pointer bg-[#00AEEF] hover:bg-[#0092c9] text-white font-bold rounded-md text-xs transition-colors flex items-center justify-center space-x-2"
        >
          <Clock size={14} />
          <span>СКЛАСТИ ТРАНЗИТНИЙ МАРШРУТ</span>
        </button>
      </form>

      {/* Render route steps output */}
      {routeResult ? (
        <div className="border-t border-neutral-800 pt-3.5 space-y-4 animate-fade-in" id="route-results-container">
          <div className="bg-[#00AEEF]/10 p-3 rounded-md border border-[#00AEEF]/30 flex items-center justify-between" id="route-summary-badge">
            <div className="space-y-0.5">
              <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider block">ЗАГАЛЬНИЙ ЧАС ДОРОГИ</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-extrabold text-[#00AEEF] font-mono">~{routeResult.totalDurationMinutes}</span>
                <span className="text-[10px] text-[#00AEEF] font-mono font-semibold">хв (хвилин)</span>
              </div>
            </div>

            <div className="flex space-x-4 text-xs font-medium">
              <div className="text-right">
                <span className="text-[9px] text-neutral-500 block uppercase font-mono">Переходів</span>
                <span className="font-bold text-white font-mono">{routeResult.transfersCount}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-neutral-500 block uppercase font-mono">Станцій</span>
                <span className="font-bold text-white font-mono">{routeResult.pathStationIds.length}</span>
              </div>
            </div>
          </div>

          {/* Graphical timeline */}
          <div className="relative pl-5 space-y-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-800" id="route-timeline-steps">
            {routeResult.steps.map((step, idx) => {
              const stepStation = findStationById(step.stationId);
              
              return (
                <div key={`step-${idx}`} className="relative text-xs group" id={`route-step-item-${idx}`}>
                  {/* Bullet */}
                  <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 bg-[#121214] transition-transform group-hover:scale-110 ${
                    step.type === 'start' 
                      ? 'border-[#00AEEF] ring-4 ring-[#00AEEF]/10' 
                      : step.type === 'end' 
                        ? 'border-emerald-500 ring-4 ring-emerald-500/10' 
                        : step.type === 'transfer' 
                          ? 'border-amber-500 ring-4 ring-amber-500/10'
                          : 'border-neutral-700'
                  }`} />

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">
                        {step.instruction}
                      </span>
                      {step.durationMinutes > 0 && (
                        <span className="text-[10px] text-neutral-450 font-mono">
                          ({step.durationMinutes} хв)
                        </span>
                      )}
                    </div>

                    {/* Additional meta detail to make it feel deeply helpful */}
                    {stepStation && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => onSelectStationById(step.stationId)}
                          className="text-[9.5px] text-[#00AEEF] bg-[#00AEEF]/10 border border-[#00AEEF]/30 px-1.5 py-0.5 rounded hover:bg-[#00AEEF]/20 cursor-pointer transition-colors font-mono"
                          id={`select-sc-button-${step.stationId}`}
                        >
                          Розклад ст. «{stepStation.name}»
                        </button>
                        {stepStation.depthMeters && (
                          <span className="text-[9px] text-neutral-500 font-mono bg-neutral-900 border border-neutral-800/80 px-1.5 py-0.5 rounded">Глибина: {stepStation.depthMeters}м</span>
                        )}
                        {stepStation.hasUndergroundSchool && (
                          <span className="text-[9.5px] text-amber-500 bg-amber-500/10 border border-amber-500/30 font-bold px-1.5 rounded-full font-mono">🎓 Метрошкола</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-neutral-900/20 rounded-md border border-dashed border-neutral-800" id="no-route-display">
          <HelpCircle size={30} className="text-neutral-700 mx-auto" strokeWidth={1.5} />
          <p className="text-[11px] text-neutral-400 font-medium mt-2">Маршрут не вирахувано. Оберіть початкову та кінцеву точки транзиту.</p>
        </div>
      )}
    </div>
  );
}
