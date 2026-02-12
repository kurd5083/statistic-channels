import channels from '@/assets/channels.jpg';
import excel from '@/assets/excel.svg';
import setting from '@/assets/setting.svg';
import rating from '@/assets/rating.svg';
import useResolution from '@/hooks/useResolution';

const Channels = () => {
    const { isSmall, isXLarge, isMedium } = useResolution();

    return (
        <ul className='!pb-8'>
            <li className='grid gap-4 items-center 
                grid-cols-[1fr_1fr_1fr] 
                sm:grid-cols-[1fr_1fr_1fr_1fr_48px] 
                md:grid-cols-[1fr_1fr_1fr_1fr_220px] 
                xl:grid-cols-[210px_1fr_100px_minmax(0px,32px)_100px_minmax(0px,32px)_120px_minmax(0px,32px)_110px_1fr_274px_48px] 
                grid-rows-1 mt-10 sm:mt-12 px-6 lg:px-16'
            >
                <div className='flex items-center gap-4 col-start-1 col-span-2 xl:col-span-1 row-start-1 row-start-1'>
                    <img className='w-10 h-10 rounded-full' src={channels} alt="ava" />
                    <div>
                        <h2 className='text-[14px] font-medium'>Antropia Digital</h2>
                        <p className='mt-1 text-[14px] text-[#A3ABBC] font-medium'>15.750 подписчиков</p>
                    </div>
                </div>
                <div className='hidden xl:block xl:col-start-2 xl:col-span-1 xl:row-start-1'></div>
                <div className='flex flex-col items-start xl:items-center col-start-1 xl:col-start-3 col-span-1 row-start-2 xl:row-start-1'>
                    <p className='text-[14px] font-medium'>150</p>
                    <span className='mt-1 text-[14px] text-[#A3ABBC] font-medium'>Подписки</span>
                </div>
                <div className='hidden xl:block xl:col-start-4 col-span-1 xl:row-start-1'></div>
                <div className='flex flex-col items-start xl:items-center col-start-2 xl:col-start-5 col-span-1 row-start-2 xl:row-start-1'>
                    <p className='text-[14px] font-medium'>- 100</p>
                    <span className='mt-1 text-[14px] text-[#A3ABBC] font-medium'>Отписки</span>
                </div>
                <div className='hidden xl:block xl:col-start-6 col-span-1 xl:row-start-1'></div>
                <div className='flex flex-col items-start xl:items-center col-start-3 xl:col-start-7 col-span-1 row-start-2 xl:row-start-1'>
                    <p className='text-[14px] font-medium'>1.552</p>
                    <span className='mt-1 text-[14px] text-[#A3ABBC] font-medium'>Чистый трафик</span>
                </div>
                <div className='hidden xl:block xl:col-start-8 col-span-1 xl:row-start-1'></div>
                <div className='flex flex-col items-start xl:items-center col-start-1 sm:col-start-4 xl:col-start-9 col-span-1 row-start-3 sm:row-start-2 xl:row-start-1'>
                    <p className='text-[14px] font-medium'>45%</p>
                    <span className='mt-1 text-[14px] text-[#A3ABBC] font-medium'>Конверсия</span>
                </div>
                <div className='hidden xl:block xl:col-start-10 col-span-1 xl:row-start-1'></div>
                <div className='flex justify-end gap-2 col-start-3 xl:col-start-11 col-span-1 sm:col-span-3 xl:col-span-1 row-start-1 row-start-1'>
                    <button className='flex justify-center items-center bg-[#FCFDFF] h-14 w-14 rounded-[16px] hover:-translate-y-1 transition-all duration-200'>
                        <img src={excel} alt="excel" />
                    </button>
                    <button className='flex items-center gap-4 border-1 border-[#DFE2EE] text-[14px] h-14 px-6 font-semibold rounded-[16px] hover:-translate-y-1 transition-all duration-200'>
                        <img src={rating} alt="rating" />{!isSmall && 'Показать график'}
                    </button>
                </div>
                <div className='flex justify-end col-start-2 sm:col-start-5 xl:col-start-12 col-span-2 sm:col-span-1 row-start-3 sm:row-start-2 xl:row-start-1 row-start-1'>
                    <button className='flex items-center gap-4 justify-center items-center bg-[#FCFDFF] h-12 sm:w-12 md:w-auto xl:w-12 px-6 sm:px-0 md:px-6 xl:px-0 rounded-[16px] text-[14px] font-semibold hover:-translate-y-1 transition-all duration-200'>
                        <img src={setting} alt="setting" />
                        {isSmall
                            ? 'Настройки канала'
                            : isXLarge && !isMedium
                                ? 'Настройки канала'
                                : null
                        }
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default Channels
