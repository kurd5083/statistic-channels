import { useState, useRef, useEffect, useMemo } from "react";

import ArrowIcon from "@/icons/ArrowIcon";

type Option = {
  id: string | number;
  label: string;
}

type CustomSelectProps = {
  placeholder?: string,
  options: Option[],
  value: string,
  onChange: (id: number | string) => void,
  view?: string
}

const CustomSelect = ({ placeholder, options, value, onChange, view }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string | number) => {
    if (id !== value) onChange(id);
    setIsOpen(false);
  };

  const headerLabel = useMemo(() => {
    if (!value) return placeholder;
    return options?.find((o) => o.id === value)?.label || placeholder;
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="flex justify-end relative">
      <div
        className={`w-min flex items-center gap-4 cursor-pointer 
          ${view && 'h-14 px-4 sm:px-6 rounded-[16px] hover:bg-[#EFF3FF] transition-colors duration-200 group'} 
          ${view == "transporent" && 'border-1 border-[#DFE2EE]'} 
          ${view == "filling" && 'bg-[#FCFDFF]'} 
        `}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
      >
        <p
          className={`truncate font-medium text-[#A3ABBC] text-[12px] sm:text-[14px] 
            ${view && '!text-[#282E3B] font-semibold'} 
            ${isOpen && '!text-[#488BFF]'} 
          `}>
          {headerLabel}
        </p>
        <div
          className={`transition-transform duration-300`}
          style={{ transform: isOpen ? "rotate(270deg)" : "rotate(90deg)" }}
        >
          <ArrowIcon width={12} height={12} color={isOpen ? "#488BFF" : "#A3ABBC"} />
        </div>
      </div>

      {isOpen && (
        <div className={`absolute right-0 ${view ? 'top-14' : 'top-5'} rounded-[12px] mt-2 max-h-[240px] w-full overflow-y-auto p-2 bg-[#FCFDFF] z-20 shadow-md`}>
          <div className="flex flex-col gap-1">
            {options?.map((option) => (
              <div
                key={option.id}
                className="flex cursor-pointer text-[#A3ABBC] px-2 py-1 rounded hover:bg-[#488BFF] hover:text-white transition-colors duration-200"
                onClick={() => toggleItem(option.id)}
              >
                <p className="truncate">{option.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
