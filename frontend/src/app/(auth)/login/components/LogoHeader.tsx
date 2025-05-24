'use client';

import { Orbit } from "lucide-react";

const LogoHeader = () => (
  <div className="flex items-center gap-2 text-3xl lg:text-4xl font-bold text-[#39439f]">
    <Orbit className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={2} />
    ORBIT
  </div>
);

export default LogoHeader;
