"use client";

import BarChartComponent from "@/components/BarChart";

interface Top10ChartProps {
  data: Array<{ name: string; flag: string; value: number; code: string }>;
}

export default function Top10Chart({ data }: Top10ChartProps) {
  return (
    <BarChartComponent
      data={data}
      metric="Defense Spending ($B)"
      valueFormatter={(v) => `$${v.toFixed(1)}B`}
    />
  );
}
