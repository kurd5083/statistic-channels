import { useState } from "react";

import ArrowIcon from "@/icons/ArrowIcon";

import CustomSelect from "@/shared/CustomSelect"

const ChartHead = () => {
    const [metrics, setMetrics] = useState<string>('')
    const [range, setRange] = useState<string>('')

    return (
        <div className="px-6 lg:px-16 mt-4 sm:mt-0">
            <div className="flex items-center gap-6">
                <h2 className='text-[24px] flex items-center gap-4'>График <ArrowIcon width={6} height={11} color="#A3ABBC" /></h2>
                <span className="text-[#A3ABBC] text-[14px] font-medium">Продуктовая аналитика</span>
            </div>
            <div>
                <CustomSelect
                placeholder="Оповещения"
            options={[
              { id: 1, label: "test 1" },
              { id: 2, label: "test 2" },
              { id: 3, label: "test 3" },
            ]}
            value={metrics}
            onChange={(id) => setMetrics(String(id))}
                />
                <CustomSelect
                placeholder="Оповещения"
            options={[
              { id: 1, label: "test 1" },
              { id: 2, label: "test 2" },
              { id: 3, label: "test 3" },
            ]}
            value={range}
            onChange={(id) => setRange(String(id))}
                />
            </div>
        </div>
    )
}

export default ChartHead
