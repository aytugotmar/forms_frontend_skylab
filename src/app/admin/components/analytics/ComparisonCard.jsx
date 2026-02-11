"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function ComparisonCard({ data }) {
  const { thisWeek, lastWeek, growth } = data;

  const getTrendIcon = (value) => {
    if (value > 0) return <TrendingUp className="h-3 w-3" />;
    if (value < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = (value) => {
    if (value > 0) return "text-green-400";
    if (value < 0) return "text-red-400";
    return "text-neutral-400";
  };

  return (
    <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur">
      <h3 className="text-sm font-semibold text-neutral-200 mb-4">
        Haftalık Karşılaştırma
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {/* Yanıtlar */}
        <div>
          <p className="text-xs text-neutral-500 mb-1">Yanıtlar</p>
          <p className="text-xl font-bold text-neutral-100">
            {thisWeek.responses}
          </p>
          <div
            className={`flex items-center gap-1 mt-1 text-xs ${getTrendColor(growth.responses)}`}
          >
            {getTrendIcon(growth.responses)}
            <span>{Math.abs(growth.responses).toFixed(1)}%</span>
          </div>
          <p className="text-[10px] text-neutral-600 mt-1">
            Önceki: {lastWeek.responses}
          </p>
        </div>

        {/* Formlar */}
        <div>
          <p className="text-xs text-neutral-500 mb-1">Formlar</p>
          <p className="text-xl font-bold text-neutral-100">{thisWeek.forms}</p>
          <div
            className={`flex items-center gap-1 mt-1 text-xs ${getTrendColor(growth.forms)}`}
          >
            {getTrendIcon(growth.forms)}
            <span>{Math.abs(growth.forms).toFixed(1)}%</span>
          </div>
          <p className="text-[10px] text-neutral-600 mt-1">
            Önceki: {lastWeek.forms}
          </p>
        </div>

        {/* Günlük Ortalama */}
        <div>
          <p className="text-xs text-neutral-500 mb-1">Ort/Gün</p>
          <p className="text-xl font-bold text-neutral-100">
            {thisWeek.avgPerDay}
          </p>
          <div
            className={`flex items-center gap-1 mt-1 text-xs ${getTrendColor(growth.avgPerDay)}`}
          >
            {getTrendIcon(growth.avgPerDay)}
            <span>{Math.abs(growth.avgPerDay).toFixed(1)}%</span>
          </div>
          <p className="text-[10px] text-neutral-600 mt-1">
            Önceki: {lastWeek.avgPerDay}
          </p>
        </div>
      </div>
    </div>
  );
}
