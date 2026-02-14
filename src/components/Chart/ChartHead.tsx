import { useState } from "react";

import ArrowIcon from "@/icons/ArrowIcon";

import CustomSelect from "@/shared/CustomSelect"

const ChartHead = () => {
    const [metrics, setMetrics] = useState<string>('')
    const [range, setRange] = useState<string>('')

    return (
        <div className="flex flex-col md:flex-row gap-6 justify-between px-6 lg:px-16 mt-4 sm:mt-0 xl:mt-10">
            <div className="flex items-center gap-6">
                <h2 className='text-[20px] sm:text-[24px] flex items-center gap-4'>График <ArrowIcon width={6} height={11} color="#A3ABBC" /></h2>
                <span className="text-[#A3ABBC] text-[12px] sm:text-[14px] font-medium">Продуктовая аналитика</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <CustomSelect
                    placeholder="Метрика"
                    options={[
                        { id: "subscriptions", label: "Подписки" },
                        { id: "unsubscriptions", label: "Отписки" },
                        { id: "netTraffic", label: "Чистый трафик" },
                        { id: "conversion", label: "Конверсия" },
                    ]}
                    value={metrics}
                    onChange={(id) => setMetrics(String(id))}
                    view="transporent"
                />
                <CustomSelect
                    placeholder="Период"
                    options={[
                        { id: "day", label: "24 часа" },
                        { id: "week", label: "За неделю" },
                        { id: "month", label: "За месяц" },
                        { id: "year", label: "За год" },
                    ]}
                    value={range}
                    onChange={(id) => setRange(String(id))}
                    view="filling"
                />
            </div>
        </div>
    )
}

export default ChartHead
