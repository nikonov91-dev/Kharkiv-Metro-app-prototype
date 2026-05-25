/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';
import { Station, LineId } from '../types';

interface MetroMapProps {
  onStationSelect: (station: Station) => void;
  selectedStationId?: string;
  stations: Record<LineId, Station[]>;
}

interface MapNode {
  id: string;
  name: string;
  lineId: LineId;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  align: 'start' | 'end' | 'middle';
}

const NODES_DATA: Record<LineId, MapNode[]> = {
  red: [
    { id: 'kholodna_hora', name: 'Холодна гора', lineId: 'red', x: 80, y: 320, labelX: 80, labelY: 345, align: 'middle' },
    { id: 'vokzalna', name: 'Вокзальна', lineId: 'red', x: 140, y: 310, labelX: 140, labelY: 335, align: 'middle' },
    { id: 'tsentralnyi_rynok', name: 'Центр. ринок', lineId: 'red', x: 210, y: 300, labelX: 210, labelY: 325, align: 'middle' },
    { id: 'maidan_konstytutsii', name: 'Майдан Конст.', lineId: 'red', x: 290, y: 280, labelX: 280, labelY: 260, align: 'middle' },
    { id: 'levada', name: 'Левада', lineId: 'red', x: 370, y: 300, labelX: 370, labelY: 325, align: 'middle' },
    { id: 'sportyvna', name: 'Спортивна', lineId: 'red', x: 440, y: 320, labelX: 430, labelY: 300, align: 'middle' },
    { id: 'zavodska', name: 'Заводська', lineId: 'red', x: 500, y: 340, labelX: 500, labelY: 365, align: 'middle' },
    { id: 'turboatom', name: 'Турбоатом', lineId: 'red', x: 560, y: 360, labelX: 560, labelY: 385, align: 'middle' },
    { id: 'palats_sportu', name: 'Палац Спорту', lineId: 'red', x: 620, y: 380, labelX: 615, labelY: 405, align: 'middle' },
    { id: 'armiiska', name: 'Армійська', lineId: 'red', x: 670, y: 400, labelX: 670, labelY: 425, align: 'middle' },
    { id: 'imeni_maselskoho', name: 'ім. Масельського', lineId: 'red', x: 715, y: 420, labelX: 715, labelY: 445, align: 'middle' },
    { id: 'traktornyi_zavod', name: 'Тракторний зав.', lineId: 'red', x: 752, y: 440, labelX: 732, labelY: 465, align: 'middle' },
    { id: 'industrialna', name: 'Індустріальна', lineId: 'red', x: 785, y: 460, labelX: 750, labelY: 485, align: 'middle' },
  ],
  blue: [
    { id: 'istorychnyi_muzei', name: 'Істор. музей', lineId: 'blue', x: 290, y: 230, labelX: 345, labelY: 235, align: 'start' },
    { id: 'universytet', name: 'Університет', lineId: 'blue', x: 290, y: 140, labelX: 345, labelY: 145, align: 'start' },
    { id: 'yaroslava_mudroho', name: 'Яр. Мудрого', lineId: 'blue', x: 350, y: 100, labelX: 360, labelY: 90, align: 'start' },
    { id: 'kyivska', name: 'Київська', lineId: 'blue', x: 430, y: 80, labelX: 430, labelY: 60, align: 'middle' },
    { id: 'akademika_barabashova', name: 'Ак. Барабашова', lineId: 'blue', x: 510, y: 80, labelX: 510, labelY: 60, align: 'middle' },
    { id: 'akademika_pavlova', name: 'Ак. Павлова', lineId: 'blue', x: 580, y: 80, labelX: 580, labelY: 60, align: 'middle' },
    { id: 'studentska', name: 'Студентська', lineId: 'blue', x: 650, y: 80, labelX: 650, labelY: 60, align: 'middle' },
    { id: 'saltivska', name: 'Салтівська', lineId: 'blue', x: 720, y: 80, labelX: 720, labelY: 60, align: 'middle' },
  ],
  green: [
    { id: 'peremoha', name: 'Перемога', lineId: 'green', x: 60, y: 50, labelX: 65, labelY: 35, align: 'start' },
    { id: 'oleksiiivska', name: 'Олексіївська', lineId: 'green', x: 100, y: 75, labelX: 110, labelY: 70, align: 'start' },
    { id: '23_serpnia', name: '23 Серпня', lineId: 'green', x: 140, y: 100, labelX: 150, labelY: 95, align: 'start' },
    { id: 'botanichnyi_sad', name: 'Ботанічний сад', lineId: 'green', x: 180, y: 125, labelX: 190, labelY: 120, align: 'start' },
    { id: 'naukova', name: 'Наукова', lineId: 'green', x: 220, y: 150, labelX: 230, labelY: 145, align: 'start' },
    { id: 'derzhprom', name: 'Держпром', lineId: 'green', x: 250, y: 168, labelX: 195, labelY: 185, align: 'end' },
    { id: 'arkhitektora_beketova', name: 'Арх. Бекетова', lineId: 'green', x: 370, y: 220, labelX: 410, labelY: 200, align: 'start' },
    { id: 'zakhysnykiv_ukrainy', name: 'Захисн. України', lineId: 'green', x: 440, y: 260, labelX: 470, labelY: 255, align: 'start' },
    { id: 'metrobudivnykiv', name: 'Метробудівників', lineId: 'green', x: 440, y: 370, labelX: 480, labelY: 390, align: 'start' },
  ]
};

// Transfer links coordinates representation on map
const TRANSFERS = [
  { from: { x: 290, y: 280 }, to: { x: 290, y: 230 }, label: 'Конституції ↔ Іст. Музей' },
  { from: { x: 290, y: 140 }, to: { x: 250, y: 168 }, label: 'Університет ↔ Держпром' },
  { from: { x: 440, y: 320 }, to: { x: 440, y: 370 }, label: 'Спортивна ↔ Метробудівників' }
];

export default function MetroMap({ onStationSelect, selectedStationId, stations }: MetroMapProps) {
  
  const handleNodeClick = (nodeId: string) => {
    // Find station object
    const found = [...stations.red, ...stations.blue, ...stations.green].find(s => s.id === nodeId);
    if (found) {
      onStationSelect(found);
    }
  };

  return (
    <div className="bg-[#121214] p-3.5 rounded-lg border border-neutral-800 shadow-xs flex flex-col space-y-3" id="interactive-metro-map-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2" id="map-header-panel">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2" id="map-title">
            <Compass size={15} className="text-[#00AEEF] animate-spin-slow" />
            <span className="font-mono uppercase text-xs tracking-tight">ІНТЕРАКТИВНА СХЕМА ЛІНІЙ</span>
          </h3>
          <p className="text-[11px] text-neutral-400">Натисніть на станцію для виведення розкладу та параметрів укриття</p>
        </div>
        <div className="flex items-center space-x-3 text-[10px] font-mono font-medium text-neutral-500" id="map-legend">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
            <span>Холодногірська</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] shadow-[0_0_4px_#00AEEF]" />
            <span>Салтівська</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
            <span>Олексіївська</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas representing lines */}
      <div className="w-full overflow-x-auto border border-neutral-800 rounded-lg bg-[#0c0c0e] p-2 scrollbar-thin" id="svg-map-scrollable-container">
        <svg 
          viewBox="0 0 810 500" 
          className="w-full min-w-[720px] h-[440px] select-none mx-auto" 
          id="kharkiv-metro-svg-map"
        >
          {/* Grids / Background Lines for aesthetics */}
          <g opacity="0.08" stroke="#52525b" strokeWidth="1">
            <line x1="50" y1="0" x2="50" y2="500" />
            <line x1="150" y1="0" x2="150" y2="500" />
            <line x1="250" y1="0" x2="250" y2="500" />
            <line x1="350" y1="0" x2="350" y2="500" />
            <line x1="450" y1="0" x2="450" y2="500" />
            <line x1="550" y1="0" x2="550" y2="500" />
            <line x1="650" y1="0" x2="650" y2="500" />
            <line x1="750" y1="0" x2="750" y2="500" />
            <line x1="0" y1="100" x2="810" y2="100" />
            <line x1="0" y1="200" x2="810" y2="200" />
            <line x1="0" y1="300" x2="810" y2="300" />
            <line x1="0" y1="400" x2="810" y2="400" />
          </g>

          {/* TRANSFER HUBS BACKGROUNDS */}
          {TRANSFERS.map((trans, idx) => (
            <line
              key={`transfer-line-${idx}`}
              id={`transfer-line-svg-${idx}`}
              x1={trans.from.x}
              y1={trans.from.y}
              x2={trans.to.x}
              y2={trans.to.y}
              stroke="#52525b"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="4 2"
              className="animate-pulse"
              opacity="0.5"
            />
          ))}

          {TRANSFERS.map((trans, idx) => (
            <line
              key={`transfer-inner-${idx}`}
              id={`transfer-inner-svg-${idx}`}
              x1={trans.from.x}
              y1={trans.from.y}
              x2={trans.to.x}
              y2={trans.to.y}
              stroke="#121214"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="1"
            />
          ))}

          {/* MAIN LINE PATHS */}
          {/* Red Line Path */}
          <path
            id="red-line-svg-path"
            d="M 80,320 L 140,310 L 210,300 L 290,280 L 370,300 L 440,320 L 500,340 L 560,360 L 620,380 L 670,400 L 715,420 L 752,440 L 785,460"
            fill="none"
            stroke="#ef4444"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Blue Line Path */}
          <path
            id="blue-line-svg-path"
            d="M 290,230 L 290,140 L 350,100 L 430,80 L 510,80 L 580,80 L 650,80 L 720,80"
            fill="none"
            stroke="#00AEEF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Green Line Path */}
          <path
            id="green-line-svg-path"
            d="M 60,50 L 100,75 L 140,100 L 180,125 L 220,150 L 250,168 L 370,220 L 440,260 L 440,370"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* NODES & LABELS */}
          {(['red', 'blue', 'green'] as LineId[]).map((lineKey) =>
            NODES_DATA[lineKey].map((node) => {
              const isSelected = selectedStationId === node.id;
              const nodeStation = [...stations.red, ...stations.blue, ...stations.green].find(s => s.id === node.id);
              const hasSchool = nodeStation?.hasUndergroundSchool;

              // Color configs
              let nodeColor = '#ef4444'; // red
              if (node.lineId === 'blue') nodeColor = '#00AEEF';
              if (node.lineId === 'green') nodeColor = '#10b981';

              return (
                <g 
                   key={node.id} 
                   id={`map-node-group-${node.id}`} 
                   className="cursor-pointer group"
                   onClick={() => handleNodeClick(node.id)}
                >
                  {/* Outer selection glow */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill={nodeColor}
                      opacity="0.35"
                      className="animate-ping"
                    />
                  )}

                  {/* Hover circle target */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill="transparent"
                    className="group-hover:fill-current/10 transition-colors"
                    stroke={isSelected ? '#71717a' : 'transparent'}
                    strokeWidth="1.5"
                  />

                  {/* Main Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? '7' : '5'}
                    fill="#121214"
                    stroke={nodeColor}
                    strokeWidth="3.5"
                    className="transition-all duration-200 group-hover:r-7"
                  />

                  {/* School Indicator Dot */}
                  {hasSchool && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="2"
                      fill="#f59e0b"
                    />
                  )}

                  {/* Station label text background shadow */}
                  <text
                    cx={node.labelX}
                    cy={node.labelY}
                    x={node.labelX}
                    y={node.labelY}
                    textAnchor={node.align}
                    className="text-[9px] font-sans fill-neutral-900 font-bold select-none pointer-events-none select-none"
                    stroke="#0c0c0e"
                    strokeWidth="3.5"
                    paintOrder="stroke"
                    opacity="0.9"
                  >
                    {node.name}
                  </text>

                  {/* Actual text label */}
                  <text
                    cx={node.labelX}
                    cy={node.labelY}
                    x={node.labelX}
                    y={node.labelY}
                    textAnchor={node.align}
                    className={`text-[9px] font-sans pointer-events-none select-none transition-colors ${
                      isSelected 
                        ? 'fill-white font-extrabold text-[10px]' 
                        : 'fill-neutral-450 font-medium group-hover:fill-white group-hover:font-semibold'
                    }`}
                  >
                    {node.name}
                    {hasSchool && ' 🎓'}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2 border-t pt-2.5 border-neutral-800" id="map-hints-row">
        <span className="flex items-center space-x-1" id="school-hint-box">
          <span className="text-amber-500 font-bold">🎓</span>
          <span>— діє підземна <b>«Метрошкола»</b> на базі станції</span>
        </span>
        <span className="flex items-center space-x-1 text-[10px] font-mono" id="alert-hint-box">
          <AlertCircle size={10} className="text-neutral-500" />
          <span>Схема Харківського метрополітену © 2026</span>
        </span>
      </div>
    </div>
  );
}
