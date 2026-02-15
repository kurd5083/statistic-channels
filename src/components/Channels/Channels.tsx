import channels from '@/assets/channels.jpg';
import excel from '@/assets/excel.svg';
import rating from '@/assets/rating.svg';

import SettingIcon from '@/icons/SettingIcon';

import useResolution from '@/hooks/useResolution';

const channelData = [
    {
        icon: channels,
        name: 'Antropia Digital',
        subscribers: '15.750',
        online: true,
        subscriptions: '150',
        unsubscribes: '-100',
        traffic: '1.552',
        conversion: '45',
    },
    {
        icon: channels,
        name: 'Creative Minds',
        subscribers: '22.410',
        online: false,
        subscriptions: '210',
        unsubscribes: '-50',
        traffic: '1.750',
        conversion: '60%',
    },
    {
        icon: channels,
        name: 'EduStream',
        subscribers: '5.600',
        online: true,
        subscriptions: '75',
        unsubscribes: '-10',
        traffic: '650',
        conversion: '25%',
    },
    {
        icon: channels,
        name: 'Gaming Hub',
        subscribers: '18.900',
        online: false,
        subscriptions: '180',
        unsubscribes: '-70',
        traffic: '2.200',
        conversion: '50%',
    },
];

const Channels = () => {
    const { isSmall, isXLarge, isMedium } = useResolution();

    return (
        <ul className='flex flex-col gap-8 !pb-8 !mt-10 sm:!mt-12'>
            {channelData.map((channel) => (
                <li className='grid gap-4 items-center border-b-1 border-[#A3ABBC] last:border-0
                    grid-cols-[1fr_1fr_1fr] 
                    sm:grid-cols-[1fr_1fr_1fr_1fr_48px] 
                    md:grid-cols-[1fr_1fr_1fr_1fr_220px] 
                    xl:grid-cols-[210px_1fr_100px_minmax(0px,32px)_100px_minmax(0px,32px)_120px_minmax(0px,32px)_110px_1fr_274px_48px] 
                    grid-rows-1 mx-6 lg:mx-16 pb-8  last:pb-0'
                >
                    <div className='flex items-center gap-4 col-start-1 col-span-2 xl:col-span-1 row-start-1 row-start-1'>
                        {channel.online && (
                            <span className='w-1.5 h-1.5 bg-[#488BFF] rounded-full'/>
                        )}
                        <img className='w-10 h-10 rounded-full' src={channels} alt="ava" />
                        <div>
                            <h2 className='text-[12px] sm:text-[14px] font-medium'>{channel.name}</h2>
                            <p className='mt-1 text-[12px] sm:text-[14px] text-[#A3ABBC] font-medium'>{channel.subscribers} подписчиков</p>
                        </div>
                    </div>
                    <div className='hidden xl:block xl:col-start-2 xl:col-span-1 xl:row-start-1'></div>
                    <div className='flex flex-col items-start xl:items-center col-start-1 xl:col-start-3 col-span-1 row-start-2 xl:row-start-1'>
                        <p className='text-[12px] sm:text-[14px] font-medium'>{channel.subscriptions}</p>
                        <span className='mt-1 text-[12px] sm:text-[14px] text-[#A3ABBC] font-medium'>Подписки</span>
                    </div>
                    <div className='hidden xl:block xl:col-start-4 col-span-1 xl:row-start-1'></div>
                    <div className='flex flex-col items-start xl:items-center col-start-2 xl:col-start-5 col-span-1 row-start-2 xl:row-start-1'>
                        <p className='text-[12px] sm:text-[14px] font-medium'>{channel.unsubscribes}</p>
                        <span className='mt-1 text-[12px] sm:text-[14px] text-[#A3ABBC] font-medium'>Отписки</span>
                    </div>
                    <div className='hidden xl:block xl:col-start-6 col-span-1 xl:row-start-1'></div>
                    <div className='flex flex-col items-start xl:items-center col-start-3 xl:col-start-7 col-span-1 row-start-2 xl:row-start-1'>
                        <p className='text-[12px] sm:text-[14px] font-medium'>{channel.traffic}</p>
                        <span className='mt-1 text-[12px] sm:text-[14px] text-[#A3ABBC] font-medium'>Чистый трафик</span>
                    </div>
                    <div className='hidden xl:block xl:col-start-8 col-span-1 xl:row-start-1'></div>
                    <div className='flex flex-col items-start xl:items-center col-start-1 sm:col-start-4 xl:col-start-9 col-span-1 row-start-3 sm:row-start-2 xl:row-start-1'>
                        <p className='text-[12px] sm:text-[14px] font-medium'>{channel.conversion}%</p>
                        <span className='mt-1 text-[12px] sm:text-[14px] text-[#A3ABBC] font-medium'>Конверсия</span>
                    </div>
                    <div className='hidden xl:block xl:col-start-10 col-span-1 xl:row-start-1'></div>
                    <div className='flex justify-end gap-2 col-start-3 xl:col-start-11 col-span-1 sm:col-span-3 xl:col-span-1 row-start-1 row-start-1'>
                        <button className='flex justify-center items-center bg-[#FCFDFF] h-12 sm:h-14 w-12 sm:w-14 rounded-[16px] hover:-translate-y-1 transition-all duration-200'>
                            <img src={excel} alt="excel" />
                        </button>
                        <button className='flex items-center justify-center gap-4 border-1 border-[#DFE2EE] text-[14px] h-12 sm:h-14 w-12 sm:w-auto px-0 sm:px-6 font-semibold rounded-[16px] hover:-translate-y-1 transition-all duration-200'>
                            <img src={rating} alt="rating" />{!isSmall && 'Показать график'}
                        </button>
                    </div>
                    <div className='flex justify-end col-start-2 sm:col-start-5 xl:col-start-12 col-span-2 sm:col-span-1 row-start-3 sm:row-start-2 xl:row-start-1 row-start-1'>
                        <button className='flex items-center gap-4 justify-center items-center bg-[#FCFDFF] text-[#A3ABBC] hover:text-[#4783EC] h-12 sm:w-12 md:w-auto xl:w-12 px-6 sm:px-0 md:px-6 xl:px-0 rounded-[16px] text-[12px] sm:text-[14px] font-semibold hover:-translate-y-1 transition-all duration-200'>
                            <SettingIcon width={16} height={16} color='currentColor'/>
                            {isSmall
                                ? 'Настройки канала'
                                : isXLarge && !isMedium
                                    ? 'Настройки канала'
                                    : null
                            }
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Channels
