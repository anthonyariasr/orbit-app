// src/components/statistics/BarChartCredits.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { term: string; credits: number }[];
}

export default function BarChartCredits({ data }: Props) {
  return (
    <div className="rounded-xl bg-white shadow-sm p-6 lg:mr-4 lg:w-1/2">
      <h4 className="text-base font-semibold mb-4 text-[#1E1E2F]">
        Créditos por término
      </h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="term" tick={false} axisLine={false} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="credits" fill="#39439f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
