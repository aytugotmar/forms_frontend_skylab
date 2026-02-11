"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Target } from "lucide-react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-neutral-200 mb-2">{data.name}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Tamamlanma:</span>
          <span className="font-semibold text-neutral-200">{data.rate}%</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Tamamlanan:</span>
          <span className="text-neutral-200">{data.completed}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Başlanan:</span>
          <span className="text-neutral-200">{data.started}</span>
        </div>
      </div>
    </div>
  );
};

const getColorByRate = (rate) => {
  if (rate >= 80) return "#10b981"; // green
  if (rate >= 60) return "#f59e0b"; // orange
  return "#ef4444"; // red
};

export default function CompletionRatesChart({
  data,
  title = "Tamamlanma Oranları",
}) {
  return (
    <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-orange-400" />
          <h3 className="text-sm font-semibold text-neutral-200">{title}</h3>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Form başlama ve tamamlanma oranları
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="#6b7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#ffffff20" }}
            label={{
              value: "%",
              position: "insideRight",
              fill: "#6b7280",
              fontSize: 11,
            }}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#6b7280"
            fontSize={10}
            tickLine={false}
            axisLine={{ stroke: "#ffffff20" }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
          <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorByRate(entry.rate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-neutral-500">80%+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-neutral-500">60-79%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-neutral-500">&lt;60%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
