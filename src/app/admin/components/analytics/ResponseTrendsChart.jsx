"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-neutral-300 mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-neutral-400">{entry.name}:</span>
          <span className="font-semibold text-neutral-200">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ResponseTrendsChart({
  data,
  title = "Yanıt Trendleri",
}) {
  const [timeRange, setTimeRange] = useState("30d");

  const displayData = useMemo(() => {
    if (timeRange === "7d") {
      return data.slice(-7);
    } else if (timeRange === "14d") {
      return data.slice(-14);
    }
    return data;
  }, [data, timeRange]);

  const totalResponses = useMemo(() => {
    return displayData.reduce((sum, item) => sum + (item.responses || 0), 0);
  }, [displayData]);

  const averageDaily = useMemo(() => {
    return displayData.length > 0
      ? Math.round(totalResponses / displayData.length)
      : 0;
  }, [totalResponses, displayData]);

  return (
    <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-neutral-200">{title}</h3>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <p className="text-2xl font-bold text-neutral-100">
              {totalResponses}
            </p>
            <p className="text-xs text-neutral-500">Ort. {averageDaily}/gün</p>
          </div>
        </div>

        <div className="flex gap-1 rounded-lg border border-white/10 bg-neutral-900/40 p-1">
          {[
            { label: "7G", value: "7d" },
            { label: "14G", value: "14d" },
            { label: "30G", value: "30d" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                timeRange === option.value
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={displayData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#ffffff20" }}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#ffffff20" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="responses"
            name="Toplam Yanıt"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorResponses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
