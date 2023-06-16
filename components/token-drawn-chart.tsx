"use client"

import { PercentageByGroup } from "@/types/tokenDrawn"
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TokenDrawnChartProps {
  data: PercentageByGroup<string>[]
}

export function TokenDrawnChart({ data }: TokenDrawnChartProps) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data}>
        <XAxis
          dataKey="timeframe"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="monkey"
          name="Monkey"
          fill="#02A7D3"
          unit="number"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="bitcoin"
          name="Bitcoin"
          fill="#043C96"
          unit="number"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
