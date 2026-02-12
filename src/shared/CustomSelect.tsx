import { useState, useRef, useEffect, useMemo } from "react";

import ArrowIcon from "@/icons/ArrowIcon";

type Option = {
  id: string | number;
  label: string;
} 

type CustomSelectProps = {
  placeholder: string,
  options: Option[],
  value: string,
  onChange: (id: number | string) => void,
} 

const CustomSelect = ({ placeholder, options, value, onChange }: CustomSelectProps) => {
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
    <div ref={ref} className="relative">
      <div
        className='flex items-center gap-3 cursor-pointer'
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
      >
        <p className="truncate font-medium text-[#A3ABBC] text-[14px]">{headerLabel}</p>
        <div
          className={`transition-transform duration-300`}
          style={{ transform: isOpen ? "rotate(270deg)" : "rotate(90deg)" }}
        >
          <ArrowIcon width={12} height={12} color="#A3ABBC"/>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 rounded-[12px] mt-2 max-h-[240px] w-[120px] overflow-y-auto p-2 bg-[#FCFDFF] z-20">
          <div className="flex flex-col gap-3">
            {options?.map((option) => (
              <div
                key={option.id}
                className="flex cursor-pointer justify-end text-right text-[#A3ABBC]"
                onClick={() => toggleItem(option.id)}
              >
                  <p>{option.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
