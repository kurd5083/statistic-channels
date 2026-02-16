import search from '@/assets/search.svg';
import ArrowIcon from "@/icons/ArrowIcon";

import CustomSelect from "@/shared/CustomSelect"

import useResolution from '@/hooks/useResolution';

import { useFilterСhannels } from '@/store/filterСhannels';
import { useResourcesUser } from '@/store/resourcesUser';

const ChannelsHead = () => {
    const { filter, setFilter } = useFilterСhannels();
    const { query, searchResources } = useResourcesUser();
    const { isSmall } = useResolution();

    return (
        <section className='grid items-center grid-cols-[auto_1fr_auto] lg:grid-cols-[200px_1fr_auto_220px_170px] grid-rows-1 mt-10 sm:mt-12 px-6 lg:px-16 gap-y-6 lg:gap-x-2'>
            <h2 className='col-start-1 col-span-1 row-start-1 row-start-1 text-[20px] sm:text-[24px] flex items-center gap-4'>Ваши каналы <ArrowIcon width={6} height={11} color="#A3ABBC" /></h2>
            <div className='relative col-start-1 xl:col-start-2 col-span-3 lg:col-span-5 xl:col-span-1 row-start-2 xl:row-start-1 row-start-1 xl:mx-8 group'>
                <input
                    className='w-full pl-10 pb-5 border-b-1 border-[#A3ABBC] font-medium
                        group-hover:border-[#488BFF] transition-colors duration-200 text-[12px] sm:text-[14px]
                    '
                    type="text"
                    placeholder='Поиск по букве, словосочетанию'
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchResources(e.target.value)}
                />
                <img className='absolute top-[calc(50%-26px)] translate-y-1/2' src={search} alt="search" />
            </div>
            <div className='col-start-3 lg:col-start-3 col-span-1 row-start-3 lg:row-start-1 row-start-1'>
                <CustomSelect
                    options={[
                        { id: "day", label: "24 часа" },
                        { id: "week", label: "За неделю" },
                        { id: "month", label: "За месяц" },
                    ]}
                    value={filter}
                    onChange={(id) => setFilter(String(id))}
                    view="filling"
                />
            </div>
            <button className='col-start-3 lg:col-start-4 col-span-1 row-start-1 row-start-1 bg-[#E4EBFB] text-[#488BFF] text-[14px] h-12 px-4 sm:px-6 font-semibold rounded-[16px] hover:-translate-y-1 transition-all duration-200'>Выгрузить{!isSmall && (" все в Excel")}</button>
            <button className='col-start-1 lg:col-start-5 col-span-1 row-start-3 lg:row-start-1 bg-[#488BFF] text-[#fff] text-[14px] h-12 px-6 font-semibold rounded-[16px] hover:-translate-y-1 transition-all duration-200'>Добавить канал</button>
        </section>
    )
}

export default ChannelsHead
