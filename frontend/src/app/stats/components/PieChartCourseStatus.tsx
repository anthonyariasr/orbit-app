// src/components/statistics/PieChartCourseStatus.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

// Colores personalizados estilo Orbit
const COLORS = [
  "#39439f", // Aprobado
  "#2c3e50", // En curso
  "#eab308", // Reprobado
];

// Label personalizado para cada porción
const renderCustomLabel = ({
  name,
  percent,
}: PieLabelRenderProps & { name?: string }) => {
  const formatted = `${(percent * 100).toFixed(0)}%`;
  return `${name} (${formatted})`;
};

export default function PieChartCourseStatus({ data }: Props) {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-6 mt-6 lg:mt-0 lg:ml-4 lg:w-1/2">
      <h4 className="text-base font-semibold mb-4 text-[#1E1E2F]">
        Distribución de estado de cursos
      </h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            nameKey="name"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={renderCustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
