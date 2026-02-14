import { useState, useRef } from "react";

type HoverChart = {
    x: number,
    y: number,
    value: number,
    date: string,
    label: string
}

const points = [0, 50, 43, 20, 27, 24, 1, 11, 26, 8, 54, 40, 63, 23, 44, 20, 54, 25, 66, 33, 77, 12, 3, 22]

const dataX = ['1 час', '2 час', '3 час', '4 час', '5 час', '6 час', '7 час', '8 час', '9 час', '10 час', '11 час', '12 час', '13 час', '14 час', '15 час', '16 час', '17 час', '18 час', '19 час', '20 час', '21 час', '22 час', '23 час', '24 час']

const Chart = () => {
    const [hoverPos, setHoverPos] = useState<{ x: number, y: number } | null>(null);
    const [hoverChart, setHoverChart] = useState<HoverChart | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)

    const padding = 10;
    const maxY = Math.max(...points);
    const minY = Math.min(...points);

    const step = (maxY - minY) / 6;

    const dataY = Array.from({ length: 7 }, (_, i) =>
        Math.round(minY + i * step)
    ).reverse()

    const width = 1200;
    const height = 400;
    const chartHeight = 350;

    const chartPoints = points.map((item, i) => {
        const x = (i * width) / (points.length - 1);
        const y = chartHeight - (item / maxY) * chartHeight;

        return { x, y };
    });

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

    const handleMouseMoveChart = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
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

        setHoverChart({ ...closest, value: points[closestIndex], date: '1 мая 2025', label: 'За день' });

        // Корректируем позицию с учётом скролла
        const container = containerRef.current;
        const scrollOffset = container ? container.scrollLeft : 0;

        setHoverPos({
            x: closest.x * (rect.width / width) - scrollOffset * (rect.width / width),
            y: closest.y
        });
    };

    const handleMouseLeaveChart = () => setHoverChart(null);

    // Drag & Drop scroll
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

    return (
        <div
            className='relative grid grid-cols-[30px_1fr] grid-rows-[350px_50px] mt-9 pl-6 sm:px-6 lg:px-16'
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className='relative col-start-1 row-start-1'>
                {dataY.map(value => {
                    const y = padding + ((maxY - value) * (chartHeight - padding * 2)) / maxY;

                    return (
                        <p
                            key={value}
                            className="absolute left-0 -translate-y-1/2 text-[#A3ABBC]"
                            style={{ top: y }}
                        >
                            {value}
                        </p>
                    )
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
                    viewBox={`0 0 ${width} ${height}`}
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
                    {hoverChart && (
                        <circle cx={hoverChart.x} cy={hoverChart.y} r={4} fill="#FCFDFF" stroke="#72A5FD" strokeWidth="1.5" />
                    )}
                    {dataX.map((label, i) => {
                        const x =
                            padding +
                            (i * (width - padding * 2)) / (dataX.length - 1);

                        return (
                            <text
                                key={label}
                                x={x}
                                y={chartHeight + 40}
                                textAnchor="middle"
                                fontSize="8"
                                fill="#A3ABBC"
                                letterSpacing="0px"
                                wordSpacing="-1px"
                                fontFamily="Montserrat, sans-serif"
                                
                            >
                                {label}
                            </text>
                        );
                    })}
                </svg>
            </div>
            {hoverChart && hoverPos && (
                <div
                    className="absolute bg-[#FCFDFF] rounded-[16px] p-4 pointer-events-none"
                    style={{
                        left: hoverPos.x,
                        top: hoverPos.y,
                        transform: 'translate(50%, -120%)',
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                    }}
                >
                    <div className="text-[12px] text-[#A3ABBC]">{hoverChart.date}</div>
                    <p className="text-[24px]">
                        <span className="text-[16px]">$</span>{' '}
                        {hoverChart.value}{' '}
                        <span className="text-[12px] text-[#A3ABBC]">{hoverChart.label}</span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default Chart;
