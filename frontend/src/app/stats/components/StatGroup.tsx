// src/components/statistics/StatGroup.tsx
import StatCard from "./StatCard";

interface Props {
  stats: {
    title: string;
    value: string | number;
  }[];
}

export default function StatGroup({ stats }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex-1">
          <StatCard title={stat.title} value={stat.value} />
        </div>
      ))}
    </div>
  );
}
