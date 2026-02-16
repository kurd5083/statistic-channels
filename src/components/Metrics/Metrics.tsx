import { useEffect, useMemo, type FC } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import LogoIcon from "@/icons/LogoIcon"
import ArrowIcon from '@/icons/ArrowIcon';

import type { IconProps } from '@/types/IconProps'

import { useGetResourcesUser } from '@/lib/useGetResourcesUser';
import { formatText } from '@/lib/formatText';

import useResolution from '@/hooks/useResolution';

import { useStatsChannels } from '@/store/stataChannel';

import { metricsConfig } from '@/data/metricsConfig';


type MetricsItem = {
  id: string,
  title: string,
  subtitle: string,
  subtitleBac?: boolean,
  value: number | string,
  sign?: string,
  extra?: string,
  icon: FC<IconProps> | string,
}

const Metrics = () => {
  const { isXLarge } = useResolution();
  const { isLarge } = useResolution();
  const { subscribers24h, unsubscribes24h, cleanTraffic, conversion, loading, changeStats } = useStatsChannels()

  const { resourcesUser, loadingResourcesUser } = useGetResourcesUser({ userTelegramId: 7050683340 });

  useEffect(() => {
    if (!resourcesUser?.length) return
    changeStats(resourcesUser)
  }, [resourcesUser])

  const metricsData: MetricsItem[] = useMemo(() => ([
    { ...metricsConfig[0], value: subscribers24h },
    { ...metricsConfig[1], value: unsubscribes24h },
    { ...metricsConfig[2], value: cleanTraffic },
    { ...metricsConfig[3], value: conversion },
  ]), [subscribers24h, unsubscribes24h, cleanTraffic])

  const isLoading = loadingResourcesUser || loading;

  return (
    <section className='mt-6'>
      {isLoading ? (
        <div className="flex items-center justify-center h-[160px] px-6 lg:px-16">
          <p className="text-center text-[20px] sm:text-[24px] font-medium text-[#A3ABBC] animate-pulse">
            Загрузка…
          </p>
        </div>
      ) : (
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
              <div className="w-74 sm:w-80 xl:w-auto flex flex-col gap-6 rounded-[16px] p-6 bg-[#FCFDFF] hover:bg-[radial-gradient(circle,#2D67CC,#488BFF)] shadow-sm group">
                <div className="relative flex items-start justify-between z-10">
                  <h2 className="flex items-end gap-4 leading-[16px] font-medium text-[#A3ABBC] group-hover:text-[#fff]">
                    {item.title}
                    {item.subtitleBac ?
                      <span className="text-[8px] leading-[8px] font-medium py-1 px-2 rounded-[32px] group-hover:bg-[#FFFFFF] bg-[#488BFF] text-[#fff] group-hover:text-[#488BFF]">{item.subtitle}</span> :
                      <span className="text-[12px] leading-[12px] font-medium text-[#D8DCE4] group-hover:text-[#ffffff6a]">{item.subtitle}</span>
                    }
                  </h2>
                  <div className="flex items-center justify-center rounded-[8px] w-10 h-10 border-2 border-[#E9EDF6] text-[#A3ABBC] group-hover:text-[#fff]">
                    <item.icon width={16} height={16} color="currentColor" />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span
                    className="text-[24px] text-[#A3ABBC] group-hover:text-[#fff]">
                    {item.sign == "up" ?
                      <div className="flex items-center justify-center bg-[#FF7348] rounded-full w-5 h-5 mb-1 -rotate-90">
                        <ArrowIcon width={4} height={8} color="#F5F6FA" />
                        <ArrowIcon width={4} height={8} color="#F5F6FA" />
                      </div> : item.sign}
                  </span>
                  <p className="text-[48px] leading-[48px] font-light group-hover:text-[#fff]">
                    {formatText(item.value)}
                  </p>
                  {item.extra && (
                    <span className="relative  text-[24px] text-[#A3ABBC] group-hover:text-[#fff] z-10">
                      {item.extra}
                    </span>
                  )}
                  <div className="hidden group-hover:block absolute right-6 bottom-6 z-1">
                    <LogoIcon width={84} height={94} colorFirst="#5C93F2" colorSecond="#5C93F2" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  )
}

export default Metrics