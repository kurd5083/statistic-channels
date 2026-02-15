import { useState, useEffect, useRef } from "react";

type HoverChart = {
    x: number,
    y: number,
    value: number,
    date: string,
    label: string
}

const points = [0, 50, 43, 20, 27, 24, 1, 11, 26, 8, 54, 40, 63, 23, 12, 20, 54, 25, 66, 33, 77, 12, 3, 22]

const dataX = ['1 час', '2 час', '3 час', '4 час', '5 час', '6 час', '7 час', '8 час', '9 час', '10 час', '11 час', '12 час', '13 час', '14 час', '15 час', '16 час', '17 час', '18 час', '19 час', '20 час', '21 час', '22 час', '23 час', '24 час']

const Chart = () => {
    const [hoverChart, setHoverChart] = useState<HoverChart | null>(null)
    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            setChartWidth(entry.contentRect.width);
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)

    const padding = 18;
    const maxY = Math.max(...points);
    const minY = Math.min(...points);

    
    const step = (maxY - minY) / 6;

    const dataY = Array.from({ length: 7 }, (_, i) =>
        Math.round(minY + i * step)
    ).reverse()
const maxYLength = Math.max(...dataY).toString().length;
const yColumnWidth = maxYLength * 8 + 16;
    const chartTopPadding = 5;
    const width = Math.max(chartWidth, 2400);
    const height = 400;
    const chartHeight = 350;

    const chartPoints = points.map((item, i) => {
        const x =
    padding +
    (i * (width - padding * 2)) / (dataX.length - 1);
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

    const handleMouseMoveChart = (e: React.MouseEvent<SVGSVGElement>) => {
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

        setHoverChart({
            x: closest.x,
            y: closest.y,
            value: points[closestIndex],
            date: '1 мая 2025',
            label: 'За день',
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

    return (
        <div
            className='relative grid grid-rows-[350px_50px] mt-9 pl-6 sm:px-6 lg:px-16'
            style={{ gridTemplateColumns: `${yColumnWidth}px 1fr` }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className='relative col-start-1 row-start-1'>
                <div className='relative col-start-1 row-start-1'>
                    {dataY.map(value => {

                        const y =
                            chartTopPadding + padding + ((maxY - value) * (chartHeight - padding * 2)) / maxY;

                        return (
                            <p
                                key={value}
                                className="absolute left-0 -translate-y-1/2 text-[#A3ABBC]"
                                style={{ top: y }}
                            >
                                {value}
                            </p>
                        );
                    })}
                </div>
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
                                        {hoverChart.date}
                                    </text>

                                    <text x={tooltipX + 10} y={tooltipY + 56} fontSize={24} fill="#282E3B">
                                         <tspan dx={6} fontSize={16} fill="#282E3B">
                                            ${' '}
                                        </tspan>
                                        {valueText}
                                        <tspan dx={6} fontSize={10} fill="#A3ABBC">
                                            {labelText}
                                        </tspan>
                                    </text>
                                </g>
                            </>
                        );
                    })()}
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
