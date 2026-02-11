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
import { BarChart3 } from "lucide-react";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#6366f1",
  "#f97316",
  "#06b6d4",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-neutral-200 mb-2">{data.name}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Yanıt:</span>
          <span className="font-semibold text-neutral-200">
            {data.responses}
          </span>
        </div>
        {data.avgTime && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Ort. Süre:</span>
            <span className="font-semibold text-neutral-200">
              {data.avgTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FormPerformanceChart({
  data,
  title = "Form Performansı",
}) {
  const topForms = data.slice(0, 8);

  return (
    <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-neutral-200">{title}</h3>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          En çok yanıt alan formlar
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={topForms}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            type="number"
            stroke="#6b7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#ffffff20" }}
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
          <Bar dataKey="responses" radius={[0, 6, 6, 0]}>
            {topForms.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
