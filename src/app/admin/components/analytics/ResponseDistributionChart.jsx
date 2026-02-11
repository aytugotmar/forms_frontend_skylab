"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  const total = payload[0].payload.total;
  const percentage = total ? ((data.value / total) * 100).toFixed(1) : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-neutral-200 mb-2">{data.name}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Yanıt:</span>
          <span className="font-semibold text-neutral-200">{data.value}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Oran:</span>
          <span className="font-semibold text-neutral-200">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-neutral-400 truncate">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ResponseDistributionChart({
  data,
  title = "Yanıt Dağılımı",
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map((item) => ({ ...item, total }));

  return (
    <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <PieChartIcon className="h-4 w-4 text-pink-400" />
          <h3 className="text-sm font-semibold text-neutral-200">{title}</h3>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Formlara göre yanıt dağılımı
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {dataWithTotal.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <p className="text-xs text-neutral-500">Toplam Yanıt</p>
        <p className="text-xl font-bold text-neutral-100">
          {total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
