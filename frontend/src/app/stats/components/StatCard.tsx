// src/components/statistics/StatCard.tsx

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor?: string;
  textColor?: string;
}

export default function StatCard({
  title,
  value,
  bgColor = "bg-white",
  textColor = "text-[#39439f]",
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl px-8 py-8 border border-gray-200 shadow-sm min-h-[160px] flex flex-col items-center justify-center text-center ${bgColor}`}
    >
      <h4 className="text-base font-medium text-[#4e4e4e] mb-2 py-2">{title}</h4>
      <p className={`text-4xl py-2 font-semibold ${textColor}`}>{value}</p>
    </div>
  );
}
