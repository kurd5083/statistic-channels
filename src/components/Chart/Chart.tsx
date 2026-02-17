import { useState, useEffect, useRef, useMemo } from "react";

import { getDateFromFilter, getToday } from '@/lib/dateUtils';
import { formatRuDate } from "@/lib/formatRuDate";
import { getMetricValue } from "@/lib/getMetricValue";

import { useSelectedChannelStore } from "@/store/selectedChannel";

import { getPeriodStats } from '@/api/getPeriodStats';

const METRIC_LABELS: Record<
    'subscriptions' | 'unsubscriptions' | 'netTraffic' | 'conversion',
    string
> = {
    subscriptions: 'Подписки',
    unsubscriptions: 'Отписки',
    netTraffic: 'Чистый трафик',
    conversion: 'Конверсия',
};

type HoverChart = {
    x: number,
    y: number,
    value: number,
    date: string,
    label: string
}

const pointsMock = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const dataXMock = ['1 час', '2 час', '3 час', '4 час', '5 час', '6 час', '7 час', '8 час', '9 час', '10 час', '11 час', '12 час', '13 час', '14 час', '15 час', '16 час', '17 час', '18 час', '19 час', '20 час', '21 час', '22 час', '23 час', '24 час']

const buildYearLabels = (stats: { date: string }[]) => {
    const labels: string[] = [];
    let lastMonth = -1;

    stats.forEach((item, index) => {
        const d = new Date(item.date);
        const month = d.getMonth();

        if (month !== lastMonth) {
            labels[index] = d.toLocaleString('ru-RU', { month: 'short' });
            lastMonth = month;
        } else {
            labels[index] = '';
        }
    });

    return labels;
};

const Chart = () => {
    const {
        selectChannel,
        metric,
        period,
        dailyStats,
        setDailyStats,
    } = useSelectedChannelStore();

    const [loading, setLoading] = useState(false);

    const dateFrom = useMemo(() => getDateFromFilter(period), [period]);
    const today = getToday();

    useEffect(() => {
        if (!selectChannel?.id) {
            setDailyStats([]);
            return;
        }

        const fetchChartStats = async () => {
            setLoading(true);

            try {
                const includeDetails = period === 'day';

                const res = await getPeriodStats({
                    resourceId: selectChannel.id,
                    dateFrom,
                    dateTo: today,
                    includeDetails
                });

                let formatted;

                if (includeDetails) {
                    const dailyStatsDetails = res?.data?.stats?.dailyStats ?? [];

                    const hourlyStats: Record<number, { joins: number, leaves: number }> = {};

                    dailyStatsDetails.forEach((dayStat: any) => {
                        dayStat.details.joins.forEach((join: any) => {
                            const date = new Date(join.createdAt);
                            const hour = date.getHours();
                            if (!hourlyStats[hour]) hourlyStats[hour] = { joins: 0, leaves: 0 };
                            hourlyStats[hour].joins += 1;
                        });

                        dayStat.details.leaves.forEach((leave: any) => {
                            const date = new Date(leave.createdAt);
                            const hour = date.getHours();
                            if (!hourlyStats[hour]) hourlyStats[hour] = { joins: 0, leaves: 0 };
                            hourlyStats[hour].leaves += 1;
                        });
                    });

                    formatted = Array.from({ length: 24 }, (_, i) => {
                        const joins = hourlyStats[i]?.joins ?? 0;
                        const leaves = hourlyStats[i]?.leaves ?? 0;

                        let value = 0;

                        switch (metric) {
                            case 'subscriptions':
                                value = joins;
                                break;
                            case 'unsubscriptions':
                                value = leaves;
                                break;
                            case 'netTraffic':
                                value = joins - leaves;
                                break;
                            case 'conversion':
                                value = joins + leaves > 0 ? Math.round((joins / (joins + leaves)) * 100) : 0;
                                break;
                        }

                        return {
                            date: `${i} час`,
                            value,
                        };
                    });

                } else {
                    const stats = res?.data?.stats?.dailyStats ?? [];

                    formatted = stats.map((item: any) => ({
                        date: item.date,
                        value: getMetricValue(item, metric),
                    }));
                }

                setDailyStats(formatted);
            } catch (e) {
                setDailyStats([]);
            } finally {
                setLoading(false);
            }
        };

        fetchChartStats();
    }, [selectChannel?.id, metric, period, dateFrom, today, setDailyStats]);

    const [hoverChart, setHoverChart] = useState<HoverChart | null>(null)
    const [chartWidth, setChartWidth] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)

    const paddingX = 40;
    const chartHeight = 350;
    const chartTopPadding = 5;
    const width = Math.max(chartWidth, 2400);
    const height = 400;

    const points = dailyStats.length > 0 ? dailyStats.map(d => d.value) : pointsMock;
    const dataX = dailyStats.length > 0
        ? dailyStats.map(d => d.date)
        : dataXMock;
    const xLabels = dailyStats.length > 0
        ? period === 'year'
            ? buildYearLabels(dailyStats)
            : dailyStats.map(d => d.date)
        : dataXMock;

    const maxY = Math.max(...points, 1);
    const minY = Math.min(...points, 0);

    const step = (maxY - minY) / 6;

    const dataY = Array.from({ length: 7 }, (_, i) =>
        Math.round(minY + i * step)
    ).reverse()

    const maxYLength = Math.max(...dataY).toString().length;
    const yColumnWidth = maxYLength * 8 + 16;

    const chartPoints = useMemo(() => points.map((item, i) => {
        const x = paddingX + (i * (width - paddingX * 2)) / (dataX.length - 1);

        const y = chartHeight - ((item - minY) / (maxY - minY)) * chartHeight;

        return { x, y };
    }), [points, width, minY, maxY]);

    const createBezierPath = (chartPoints: { x: number; y: number }[]) => {
        let d = `M ${chartPoints[0].x} ${chartPoints[0].y}`;

        for (let i = 1; i < chartPoints.length; i++) {
            const prev = chartPoints[i - 1];
            const curr = chartPoints[i];

            const cp1x = prev.x + (curr.x - prev.x) / 2;
            const cp1y = prev.y;
            const cp2x = prev.x + (curr.x - prev.x) / 2;
            const cp2y = curr.y;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
        }

        return d;
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            setChartWidth(entry.contentRect.width);
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const handleMouseMoveChart = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!chartPoints.length) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const scaleX = width / rect.width;
        const scaledMouseX = mouseX * scaleX;

        let closestIndex = 0;
        let minDist = Math.abs(scaledMouseX - chartPoints[0].x);

        chartPoints.forEach((p, i) => {
            const dist = Math.abs(scaledMouseX - p.x);
            if (dist < minDist) {
                minDist = dist;
                closestIndex = i;
            }
        });

        const closest = chartPoints[closestIndex];

        setHoverChart({
            x: closest.x,
            y: closest.y,
            value: points[closestIndex],
            date: dataX[closestIndex],
            label: METRIC_LABELS[metric],
        });
    };

    const handleMouseLeaveChart = () => setHoverChart(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!containerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX;
        scrollStart.current = containerRef.current.scrollLeft;
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging.current || !containerRef.current) return;
        const dx = e.pageX - startX.current;
        containerRef.current.scrollLeft = scrollStart.current - dx;
    }

    const handleMouseUp = () => {
        isDragging.current = false;
    }
    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <p className="text-[20px] sm:text-[24px] text-[#A3ABBC] animate-pulse">
                    Загрузка графика…
                </p>
            </div>
        );
    }
    if (!dailyStats.length) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <p className="text-[20px] sm:text-[24px] text-[#A3ABBC]">
                    Нет данных за период
                </p>
            </div>
        );
    }
    return (
        <div
            className='relative grid grid-rows-[350px_50px] mt-9 pl-6 sm:px-6 lg:px-16'
            style={{ gridTemplateColumns: `${yColumnWidth}px 1fr` }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className='relative col-start-1 row-start-1'>
                {dataY.map((value, index) => {
                    const y = chartTopPadding + ((maxY - value) / (maxY - minY)) * chartHeight;

                    return (
                        <p
                            key={index}
                            className="absolute left-0 -translate-y-1/2 text-[#A3ABBC]"
                            style={{ top: y }}
                        >
                            {value}
                        </p>
                    );
                })}
            </div>
            <div
                ref={containerRef}
                className='overflow-x-auto scrollbar-none col-start-2 row-start-1 row-span-2 cursor-grab'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
            >
                <svg
                    width="100%"
                    height={height}
                    viewBox={`0 -${chartTopPadding} ${width} ${height + chartTopPadding}`}
                    preserveAspectRatio="none"
                    className="min-w-600"
                    onMouseMove={handleMouseMoveChart}
                    onMouseLeave={handleMouseLeaveChart}
                >
                    <defs>
                        <pattern
                            id="dots"
                            width="20"
                            height="10"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(25)"
                        >
                            <circle cx={10} cy={5} r={1.25} fill="none" stroke="#DEE4F9" strokeWidth="0.75" />
                        </pattern>
                    </defs>
                    <defs>
                        <linearGradient id="line" x1="0%" y1="100%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor='#F5F6FA00' />
                            <stop offset="5%" stopColor='#71A5FF' />
                            <stop offset="95%" stopColor='#71A5FF' />
                            <stop offset="100%" stopColor='#F5F6FA00' />
                        </linearGradient>
                    </defs>

                    <rect width={width} height={chartHeight} fill="url(#dots)" />
                    <path d={createBezierPath(chartPoints)} fill="none" stroke="url(#line)" strokeWidth={2} />
                    {hoverChart && (() => {
                        const CIRCLE_RADIUS = 4;
                        const circleX = Math.max(CIRCLE_RADIUS, Math.min(hoverChart.x, width - CIRCLE_RADIUS));
                        const circleY = hoverChart.y;

                        const TOOLTIP_HEIGHT = 70;
                        const paddingHorizontal = 16;
                        const valueText = `${hoverChart.value}`;
                        const labelText = hoverChart.label;

                        const approxCharWidth = 8;
                        const textWidth = Math.max(valueText.length * approxCharWidth, labelText.length * approxCharWidth);
                        const TOOLTIP_WIDTH = textWidth + paddingHorizontal + 80;

                        const isLeftEdge = circleX - TOOLTIP_WIDTH / 2 < 0;
                        const isRightEdge = circleX + TOOLTIP_WIDTH / 2 > width;
                        const isTopEdge = circleY - TOOLTIP_HEIGHT - 10 < 0;

                        const tooltipX = isLeftEdge ? 0 : isRightEdge ? -TOOLTIP_WIDTH : -TOOLTIP_WIDTH / 2;
                        const tooltipY = isTopEdge ? 10 : -TOOLTIP_HEIGHT - 10;

                        return (
                            <>
                                <circle
                                    cx={circleX}
                                    cy={circleY}
                                    r={CIRCLE_RADIUS}
                                    fill="#FCFDFF"
                                    stroke="#72A5FD"
                                    strokeWidth="1.5"
                                />
                                <g transform={`translate(${circleX}, ${circleY})`}>
                                    <line
                                        y1={0}
                                        y2={chartHeight - circleY}
                                        stroke="#E5E9F5"
                                        strokeDasharray="4 4"
                                    />
                                    <rect
                                        x={tooltipX}
                                        y={tooltipY}
                                        width={TOOLTIP_WIDTH}
                                        height={TOOLTIP_HEIGHT}
                                        rx={12}
                                        fill="#FCFDFF"
                                        stroke="#E5E9F5"
                                    />
                                    <text x={tooltipX + 10} y={tooltipY + 22} fontSize={12} fill="#A3ABBC">
                                        {period === 'day' ? hoverChart.date : formatRuDate(hoverChart.date)}
                                    </text>
                                    <text x={tooltipX + 10} y={tooltipY + 56} fontSize={24} fill="#282E3B">
                                        {valueText}
                                        <tspan dx={6} fontSize={10} fill="#A3ABBC">
                                            {labelText}
                                        </tspan>
                                    </text>
                                </g>
                            </>
                        );
                    })()}
                    {xLabels.map((label, i) => {
                        const x =
                            paddingX +
                            (i * (width - paddingX * 2)) / (xLabels.length - 1);
                        return (
                            <text
                                key={label}
                                x={x}
                                y={chartHeight + 40}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#A3ABBC"

                            >
                                {label}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    )
}

export default Chart;
