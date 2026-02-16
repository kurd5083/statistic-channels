import ArrowIcon from "@/icons/ArrowIcon";

import CustomSelect from "@/shared/CustomSelect"

import { useSelectedChannelStore } from "@/store/selectedChannel";

import { type MetricType } from '@/types/Metric';

const ChartHead = () => {
    const {selectChannel, metric, period, setMetric, setPeriod } = useSelectedChannelStore();

    return (
        <div className="flex flex-col md:flex-row gap-6 justify-between px-6 lg:px-16 mt-4 sm:mt-0 xl:mt-10">
            <div className="flex items-center gap-6">
                <div className='flex items-center gap-4'>
                    <h2 className='text-[20px] sm:text-[24px] -mt-1.5'>График </h2>
                    <ArrowIcon width={6} height={11} color="#A3ABBC" />
                </div>
                <span className="text-[#A3ABBC] text-[12px] sm:text-[14px] font-medium">{selectChannel?.name || "Выбирите график"}</span>
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
                    value={metric}
                    onChange={(id) => setMetric(id as MetricType)}
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
                    value={period}
                    onChange={(id) => setPeriod(String(id))}
                    view="filling"
                />
            </div>
        </div>
    )
}

export default ChartHead
