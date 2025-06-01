"use client";

import React from "react";

interface Props {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] bg-white text-sm text-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-[#39439f]"
  />
);

export default Input;
