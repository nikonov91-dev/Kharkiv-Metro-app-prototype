/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LineId = 'red' | 'blue' | 'green';

export interface Station {
  id: string;
  name: string;
  nameEn: string;
  lineId: LineId;
  order: number;
  intervalMinPeak: number;
  intervalMinOffpeak: number;
  shelterDetails: string;
  hasUndergroundSchool: boolean;
  hasTransfer: boolean;
  transferStationId?: string;
  renameHistory?: string;
  travelTimeToNextSeconds: number; // travel time to the next station in this list (0 for last station)
  depthMeters?: number;
  features?: string[];
}

export interface MetroLine {
  id: LineId;
  name: string;
  nameEn: string;
  color: string;
  textColor: string;
  borderColor: string;
  stations: Station[];
}

export interface ArrivalPrediction {
  direction1: {
    destination: string;
    nextArrivalsSeconds: number[]; // e.g. [120, 680, 1240] (seconds from now)
  };
  direction2: {
    destination: string;
    nextArrivalsSeconds: number[];
  };
}

export interface RouteStep {
  type: 'ride' | 'transfer' | 'start' | 'end';
  stationId: string;
  lineId?: LineId;
  durationMinutes: number;
  instruction: string;
}

export interface RouteResult {
  steps: RouteStep[];
  totalDurationMinutes: number;
  transfersCount: number;
  pathStationIds: string[];
}

export interface AlertMessage {
  id: string;
  timestamp: string;
  type: 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
