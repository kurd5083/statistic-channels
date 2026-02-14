import { useState } from "react"

import flag from "@/assets/flag.svg"
import ava from "@/assets/ava.jpg"
import LogoIcon from "@/icons/LogoIcon"

import CustomSelect from "@/shared/CustomSelect"

import useResolution from '@/hooks/useResolution';

const Header = () => {
  const [selectValue, setSelectValue] = useState<string>('')
  const { isSmall } = useResolution();

  return (
    <header className="flex items-center justify-between pt-5 sm:pt-8 lg:pt-11 px-6 lg:px-16 gap-6">
      <div className="w-full sm:w-auto flex items-center justify-between gap-4">
        <LogoIcon width={14} height={16} colorFirst="#488BFF" colorSecond="#7BACFF"/>
        <div className="flex-grow-1 flex flex-col gap-1">
          <span className="text-[8px]    uppercase font-light">Статистика</span>
          <p className="text-[18px] leading-[18px]">Каналов</p>
        </div>
        <div className="flex gap-4 sm:ml-20 sm:p-4 sm:bg-[#EEF0F6] rounded-[16px]">
          <img className="w-6 h-6" src={flag} alt="flag" />
          <span className="hidden sm:block text-[#5F6471] font-semibold">RU</span>
        </div>
      </div>
      <div className="flex items-center gap-8">
        {!isSmall && (
          <CustomSelect
            placeholder="Оповещения"
            options={[
              { id: 1, label: "test 1" },
              { id: 2, label: "test 2" },
              { id: 3, label: "test 3" },
            ]}
            value={selectValue}
            onChange={(id) => setSelectValue(String(id))}
          />
        )}
        <img className="flex-shrink-0 w-10 h-10 rounded-full border-4 border-[#FCFDFF] shadow-lg" src={ava} alt="ava" />
      </div>
    </header>
  )
}

export default Header
