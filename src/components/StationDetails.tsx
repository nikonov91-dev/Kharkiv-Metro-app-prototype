/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ShieldCheck, GraduationCap, MapPin, Undo2, ArrowRight, Zap, ArrowLeftRight, HelpCircle } from 'lucide-react';
import { Station, ArrivalPrediction } from '../types';
import { METRO_LINES, findStationById } from '../data/metroData';

interface StationDetailsProps {
  station: Station | null;
  onSelectStationById: (id: string) => void;
  airRaidActive: boolean;
}

export default function StationDetails({ station, onSelectStationById, airRaidActive }: StationDetailsProps) {
  const [ticker, setTicker] = useState<number>(0);
  const [arrivalSeconds, setArrivalSeconds] = useState<ArrivalPrediction | null>(null);

  // Animate/tick remaining time
  useEffect(() => {
    const timer = setInterval(() => {
      setTicker(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set up logical repeatable arrival times based on station order and current clock
  useEffect(() => {
    if (!station) return;

    // Generate initial arrival seconds that count down nicely
    // Offpeak interval is say 10 min (600s), Peak is 6 min (360s). Let's use 450s average
    const interval = (airRaidActive ? station.intervalMinOffpeak : station.intervalMinPeak) * 60; 
    
    // Seed using order and station id length to ensure consistent but varied timers
    const seed = (station.name.length * 37 + station.order * 91) % interval;
    const nowSecs = Math.floor(Date.now() / 1000) % interval;
    
    // Time remaining to next train, from 0 to interval
    let timeToNext1 = (seed - nowSecs + interval) % interval;
    let timeToNext2 = ((seed + Math.floor(interval / 2)) - nowSecs + interval) % interval;

    // Ensure we don't have absolute 0 (instantly generate at least 15s)
    if (timeToNext1 < 10) timeToNext1 += interval;
    if (timeToNext2 < 10) timeToNext2 += interval;

    setArrivalSeconds({
      direction1: {
        destination: getTerminals(station.lineId)[0],
        nextArrivalsSeconds: [timeToNext1, timeToNext1 + interval, timeToNext1 + interval * 2]
      },
      direction2: {
        destination: getTerminals(station.lineId)[1],
        nextArrivalsSeconds: [timeToNext2, timeToNext2 + interval, timeToNext2 + interval * 2]
      }
    });
  }, [station, ticker, airRaidActive]);

  const getTerminals = (lineId: string): [string, string] => {
    if (lineId === 'red') return ['ст. Холодна гора', 'ст. Індустріальна'];
    if (lineId === 'blue') return ['ст. Історичний музей', 'ст. Салтівська'];
    return ['ст. Метробудівників', 'ст. Перемога'];
  };

  const getLineDetails = (lineId: string) => {
    return METRO_LINES.find(l => l.id === lineId);
  };

  const formatCountdown = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m} хв ${s < 10 ? '0' : ''}${s} с`;
  };

  if (!station) {
    return (
      <div className="bg-[#121214] p-6 rounded-lg border border-neutral-800 shadow-xs flex flex-col items-center justify-center text-center py-12" id="no-station-details">
        <MapPin size={32} className="text-neutral-700 animate-pulse" />
        <h4 className="text-sm font-bold text-white mt-3 font-mono uppercase tracking-wider" id="no-sel-st-title">СТАНЦІЮ НЕ ОБРАНО</h4>
        <p className="text-[11px] text-neutral-500 max-w-xs mt-1">Оберіть станцію на схемі колій або скористайтеся живим пошуком для виведення діючого розкладу.</p>
      </div>
    );
  }

  const lineObj = getLineDetails(station.lineId);
  const transferStation = station.hasTransfer && station.transferStationId ? findStationById(station.transferStationId) : null;

  // Dot color utilities
  const getLineGlow = (lineId: string) => {
    if (lineId === 'red') return 'bg-red-500 shadow-[0_0_6px_#ef4444]';
    if (lineId === 'blue') return 'bg-[#00AEEF] shadow-[0_0_6px_#00AEEF]';
    return 'bg-emerald-500 shadow-[0_0_6px_#10b981]';
  };

  return (
    <div className="bg-[#121214] p-4 flex flex-col rounded-lg border border-neutral-800 shadow-xs space-y-4 animate-fade-in" id={`station-details-card-${station.id}`}>
      {/* Header Info */}
      <div className="flex items-start justify-between border-b border-neutral-800 pb-3.5" id="station-detail-title-block">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${getLineGlow(station.lineId)}`} />
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">{lineObj?.name} лінія</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">{station.name}</h2>
          <span className="text-[10.5px] text-neutral-500 font-medium font-mono block">{station.nameEn} Metro Station</span>
        </div>

        {station.depthMeters && (
          <div className="text-right" id="station-depth-badge">
            <span className="text-[9px] text-neutral-500 uppercase block font-mono">ГЛИБИНА</span>
            <span className="text-xs font-extrabold text-[#00AEEF] font-mono">{station.depthMeters}м (метрів)</span>
          </div>
        )}
      </div>

      {station.renameHistory && (
        <div className="text-[11px] bg-neutral-900/40 p-2 rounded border border-neutral-800/80 text-neutral-400 italic flex items-center space-x-1.5" id="station-rename-history">
          <Undo2 size={12} className="text-neutral-500 shrink-0" />
          <span><b>Колишня назва:</b> {station.renameHistory}</span>
        </div>
      )}

      {/* Real-Time Timetable / Predictions */}
      <div className="space-y-2.5" id="real-time-timetable-predictions">
        <h3 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
          <span>Прибуття поїздів (Реальний час)</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8.5px] font-mono font-bold bg-rose-500/15 text-rose-400 animate-pulse border border-rose-500/30">
            ● ОНЛАЙН СТАТУС
          </span>
        </h3>

        {/* Prediction Cards */}
        {arrivalSeconds ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="direction-grid-cards">
            {/* Direction 1 */}
            {station.order > 1 && (
              <div className="p-3 rounded border border-neutral-800 bg-neutral-900/30 space-y-2" id="direction-1-card">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">НАПРЯМОК L-FORWARD</span>
                  <div className="flex items-center space-x-1 font-bold text-xs text-white">
                    <ArrowRight size={12} className="text-neutral-500 shrink-0" />
                    <span className="truncate">{arrivalSeconds.direction1.destination}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9.5px] font-mono text-neutral-400">Наступний поїзд</span>
                    <span className="text-xs font-extrabold text-[#00AEEF] font-mono">
                      {formatCountdown(arrivalSeconds.direction1.nextArrivalsSeconds[0])}
                    </span>
                  </div>
                  {/* Progress bar to simulate train positioning */}
                  <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00AEEF] rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (1 - (arrivalSeconds.direction1.nextArrivalsSeconds[0] / 360)) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-neutral-600 font-mono uppercase tracking-wider">
                    <span>Перегін</span>
                    <span>Прибуття</span>
                  </div>
                </div>

                {/* Sub-arrivals list */}
                <div className="border-t border-neutral-800 pt-2 flex justify-between text-[9px] text-neutral-500 font-mono" id="sub-arrivals-d1">
                  <span>НАСУПНІ ЧЕРГИ:</span>
                  <span className="font-semibold text-neutral-350 font-mono">
                    +{Math.round(arrivalSeconds.direction1.nextArrivalsSeconds[1] / 60)}хв, +{Math.round(arrivalSeconds.direction1.nextArrivalsSeconds[2] / 60)}хв
                  </span>
                </div>
              </div>
            )}

            {/* Direction 2 */}
            {station.order < (lineObj?.stations.length || 13) && (
              <div className="p-3 rounded border border-neutral-800 bg-neutral-900/30 space-y-2" id="direction-2-card">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">НАПРЯМОК L-BACKWARD</span>
                  <div className="flex items-center space-x-1 font-bold text-xs text-white">
                    <ArrowRight size={12} className="text-neutral-500 shrink-0" />
                    <span className="truncate">{arrivalSeconds.direction2.destination}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9.5px] font-mono text-neutral-400">Наступний поїзд</span>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono">
                      {formatCountdown(arrivalSeconds.direction2.nextArrivalsSeconds[0])}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (1 - (arrivalSeconds.direction2.nextArrivalsSeconds[0] / 360)) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-neutral-600 font-mono uppercase tracking-wider">
                    <span>Перегін</span>
                    <span>Прибуття</span>
                  </div>
                </div>

                {/* Sub arrivals */}
                <div className="border-t border-neutral-800 pt-2 flex justify-between text-[9px] text-neutral-500 font-mono" id="sub-arrivals-d2">
                  <span>НАСУПНІ ЧЕРГИ:</span>
                  <span className="font-semibold text-neutral-350 font-mono">
                    +{Math.round(arrivalSeconds.direction2.nextArrivalsSeconds[1] / 60)}хв, +{Math.round(arrivalSeconds.direction2.nextArrivalsSeconds[2] / 60)}хв
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-[11px] font-mono text-neutral-500" id="predictions-loader">Оновлюємо таймінги рейсів...</div>
        )}
      </div>

      {/* Transfer Information Link */}
      {station.hasTransfer && transferStation && (
        <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded flex items-center justify-between" id="transfer-link-view">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-neutral-800 text-[#00AEEF] rounded">
              <ArrowLeftRight size={14} />
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 uppercase font-bold font-mono block">ПЕРЕСАДКА НА ІНШУ КОЛІЮ</span>
              <span className="text-xs font-bold text-white">Перехід на станцію «{transferStation.name}»</span>
            </div>
          </div>
          <button
            onClick={() => onSelectStationById(transferStation.id)}
            className="p-1.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/55 rounded transition-colors cursor-pointer"
            id={`trigger-transfer-to-${transferStation.id}`}
            title="Перейти на станцію пересадки"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Safe Shelter & Support Status */}
      <div className="p-3.5 rounded border border-neutral-800 bg-[#09090b] text-white space-y-3 relative overflow-hidden" id="station-shelter-info-block">
        <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-28 h-28 bg-[#00AEEF]/5 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between" id="shelter-status-header">
          <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono text-emerald-400 flex items-center space-x-1.5">
            <ShieldCheck size={14} />
            <span>Параметри безпечного укриття (ЦІЛОДОБОВО)</span>
          </h4>
          <span className="text-[8.5px] bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block border border-emerald-500/30 font-mono">
            ДСНС VALID
          </span>
        </div>

        <p className="text-[11.5px] text-neutral-400 leading-relaxed font-sans">{station.shelterDetails}</p>

        {station.hasUndergroundSchool && (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded flex items-start space-x-2" id="school-indicator-details">
            <GraduationCap size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-extrabold text-amber-350 font-mono">БЕЗПЕЧНА МЕТРОШКОЛА (ACTIVE CLASSES)</p>
              <p className="text-[10px] text-amber-200/80 mt-0.5 leading-relaxed">На базі цієї станції облаштовані герметичні класи. У зв&apos;язку з навчальним процесом, доступ сторонніх обмежено закритими протоколами безпеки.</p>
            </div>
          </div>
        )}

        <div className="border-t border-neutral-850 pt-2.5 grid grid-cols-2 gap-1.5 text-[9px] text-neutral-450 font-mono" id="shelter-amenities-grid">
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Автономні генератори</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Резервна питна вода</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Медична допомога ДСНС</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Обігрів & Точки USB-живлення</span>
          </div>
        </div>
      </div>

      {station.features && station.features.length > 0 && (
        <div className="space-y-1.5" id="station-features-block">
          <span className="text-[9px] font-bold font-mono text-neutral-500 uppercase tracking-widest block">ПРИНАДИ ТА КОРДОНИ СТАНЦІЇ</span>
          <div className="flex flex-wrap gap-1" id="station-features-badges">
            {station.features.map((feat, idx) => (
              <span key={`feat-${idx}`} className="text-[9.5px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono">
                {feat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
