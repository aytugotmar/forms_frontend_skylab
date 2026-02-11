"use client";

import { useMemo } from "react";
import { Activity } from "lucide-react";

const getHeatColor = (value, max) => {
  if (value === 0) return "bg-neutral-900/40 border-white/5";
  const intensity = value / max;
  if (intensity < 0.2) return "bg-blue-500/20 border-blue-500/30";
  if (intensity < 0.4) return "bg-blue-500/40 border-blue-500/50";
  if (intensity < 0.6) return "bg-blue-500/60 border-blue-500/70";
  if (intensity < 0.8) return "bg-blue-500/80 border-blue-500/90";
  return "bg-blue-500 border-blue-400";
};

export default function ActivityHeatmap({ data, title = "Aktivite Haritası" }) {
  const { days, hours, heatmapMatrix, maxValue } = useMemo(() => {
    const daysSet = new Set();
    const hoursSet = new Set();
    const matrix = new Map();
    let max = 0;

    data.forEach((item) => {
      daysSet.add(item.day);
      hoursSet.add(item.hour);
      const key = `${item.day}-${item.hour}`;
      matrix.set(key, item.value);
      max = Math.max(max, item.value);
    });

    return {
      days: Array.from(daysSet),
      hours: Array.from(hoursSet),
      heatmapMatrix: matrix,
      maxValue: max,
    };
  }, [data]);

  return (
    <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-green-400" />
          <h3 className="text-sm font-semibold text-neutral-200">{title}</h3>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Haftalık aktivite dağılımı (saatlere göre)
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header - Time slots */}
          <div className="flex items-center mb-2">
            <div className="w-12" /> {/* Spacer for day labels */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-1 min-w-[52px] text-center text-[10px] text-neutral-500 px-1"
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="space-y-1.5">
            {days.map((day) => (
              <div key={day} className="flex items-center gap-2">
                <div className="w-10 text-xs font-medium text-neutral-400">
                  {day}
                </div>
                <div className="flex gap-1.5 flex-1">
                  {hours.map((hour) => {
                    const key = `${day}-${hour}`;
                    const value = heatmapMatrix.get(key) || 0;
                    const colorClass = getHeatColor(value, maxValue);

                    return (
                      <div
                        key={key}
                        className={`flex-1 min-w-[48px] h-9 rounded-lg border transition-all hover:scale-105 ${colorClass} cursor-pointer group relative`}
                        title={`${day} ${hour}: ${value} yanıt`}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                          <div className="rounded-lg border border-white/10 bg-neutral-900/95 px-2 py-1 shadow-lg backdrop-blur-sm whitespace-nowrap">
                            <p className="text-[10px] text-neutral-400">
                              {day} {hour}
                            </p>
                            <p className="text-xs font-semibold text-neutral-200">
                              {value} yanıt
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-between text-[10px] text-neutral-500">
            <span>Daha az</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-neutral-900/40 border border-white/5" />
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/30" />
              <div className="w-4 h-4 rounded bg-blue-500/40 border border-blue-500/50" />
              <div className="w-4 h-4 rounded bg-blue-500/60 border border-blue-500/70" />
              <div className="w-4 h-4 rounded bg-blue-500/80 border border-blue-500/90" />
              <div className="w-4 h-4 rounded bg-blue-500 border border-blue-400" />
            </div>
            <span>Daha fazla</span>
          </div>
        </div>
      </div>
    </div>
  );
}
