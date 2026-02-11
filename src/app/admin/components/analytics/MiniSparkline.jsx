"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function MiniSparkline({
  data,
  color = "#3b82f6",
  trend = "up",
}) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div className="h-8 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
