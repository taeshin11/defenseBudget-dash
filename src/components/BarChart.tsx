"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BarChartProps {
  data: Array<{ name: string; flag: string; value: number; code: string }>;
  metric: string;
  valueFormatter?: (value: number) => string;
}

const ACCENT_NAVY = "#3B5998";

const defaultFormatter = (value: number) =>
  value.toLocaleString("en-US");

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: BarChartProps["data"][number];
    value: number;
  }>;
  formatter: (value: number) => string;
  metric: string;
}

function CustomTooltip({ active, payload, formatter, metric }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0].payload;

  return (
    <div className="rounded-[var(--radius-sm)] border border-border bg-white px-3 py-2 shadow-[var(--shadow-md)]">
      <p className="font-heading text-sm font-semibold text-text-primary">
        {entry.flag} {entry.name}
      </p>
      <p className="text-xs text-text-secondary">
        {metric}: <span className="font-medium text-accent-navy">{formatter(entry.value)}</span>
      </p>
    </div>
  );
}

export default function BarChartComponent({
  data,
  metric,
  valueFormatter = defaultFormatter,
}: BarChartProps) {
  const chartHeight = Math.max(300, data.length * 40);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <RechartsBarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 30, bottom: 4, left: 0 }}
        barCategoryGap="20%"
      >
        <XAxis
          type="number"
          tickFormatter={valueFormatter}
          tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 12, fill: "var(--text-primary)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(name: string) => {
            const entry = data.find((d) => d.name === name);
            return entry ? `${entry.flag} ${name}` : name;
          }}
        />
        <Tooltip
          content={
            <CustomTooltip formatter={valueFormatter} metric={metric} />
          }
          cursor={{ fill: "var(--accent-navy-light)", opacity: 0.4 }}
        />
        <Bar
          dataKey="value"
          radius={[0, 6, 6, 0]}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {data.map((entry) => (
            <Cell key={entry.code} fill={ACCENT_NAVY} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
