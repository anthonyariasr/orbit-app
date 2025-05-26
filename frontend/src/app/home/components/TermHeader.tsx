'use client';

interface TermHeaderProps {
  title: string;
}

const TermHeader = ({ title }: TermHeaderProps) => (
  <div className="bg-gradient-to-l from-[#596d93] to-[#39439f] h-20 flex items-center px-8 justify-center lg:justify-start">
    <h2 className="text-center lg:text-left text-2xl font-bold text-white">{title}</h2>
  </div>
);

export default TermHeader;
