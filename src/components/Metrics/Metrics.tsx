import type { FC } from 'react'
import type { IconProps } from '@/types/IconProps'

import DollarIcon from '@/icons/DollarIcon';
import ShopIcon from '@/icons/ShopIcon';
import UsersIcon from '@/icons/UsersIcon';
import NoteIcon from '@/icons/NoteIcon';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import useResolution from '@/hooks/useResolution';

type MetricsItem = {
  id: string,
  title: string,
  subtitle: string,
  value: number | string,
  extra?: string,
  icon: FC<IconProps> | string,
}

export const metricsData = [
  {
    id: "1",
    title: "Подписки",
    subtitle: "24H",
    value: 15.2,
    extra: "%",
    icon: DollarIcon,
  },
  {
    id: "2",
    title: "Отписки",
    subtitle: "24H",
    value: 52,
    extra: "/ час",
    icon: ShopIcon,
  },
  {
    id: "3",
    title: "Чистый трафик",
    subtitle: "ВСЕГО",
    value: 32,
    extra: "В работ",
    icon: UsersIcon,
  },
  {
    id: "4",
    title: "Конверсия",
    subtitle: "НОВОЕ",
    value: "1,244 %",
    icon: NoteIcon,
  },
];

const Metrics = () => {
  const { isXLarge } = useResolution();
  const { isLarge } = useResolution();

  return (
    <section className='mt-7'>
      <Swiper
        key={isXLarge ? "small" : "large"}
        spaceBetween={8}
        slidesPerView={isXLarge ? "auto" : 4}
        allowTouchMove={isXLarge}
        slidesOffsetBefore={isLarge ? 16 : 64}
        slidesOffsetAfter={isLarge ? 16 : 64}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {metricsData.map((item: MetricsItem) => (
          <SwiperSlide key={item.id}>
            <div className="w-74 sm:w-80 xl:w-auto flex flex-col gap-6 rounded-[16px] p-6 bg-[#FCFDFF] hover:bg-[radial-gradient(circle,#2D67CC,#488BFF)] group">
              <div className="flex items-start justify-between">
                <h2 className="flex items-end gap-4 leading-[16px] font-medium text-[#A3ABBC] group-hover:text-[#fff]">
                  {item.title}
                  <span className="text-[12px] leading-[12px] font-medium text-[#D8DCE4] group-hover:text-[#ffffff6a]">
                    {item.subtitle}
                  </span>
                </h2>
                <div className="flex items-center justify-center rounded-[8px] w-10 h-10 border-2 border-[#E9EDF6] text-[#282E3B] group-hover:text-[#fff]">
                    <item.icon width={16} height={16} color="currentColor" />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span
                  className="text-[24px] text-[#A3ABBC] group-hover:text-[#fff]">
                  {typeof item.value === "number" && item.extra === "%" ? "+" : ""}
                </span>
                <p className="text-[48px] leading-[48px] group-hover:text-[#fff]">
                  {item.value}
                </p>
                {item.extra && (
                  <span className="text-[24px] text-[#A3ABBC] group-hover:text-[#fff]">
                    {item.extra}
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Metrics