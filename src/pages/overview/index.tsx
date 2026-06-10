import { useState, useRef, MouseEvent } from "react"
import { ChevronDown } from "lucide-react"
import MonthlyMentors from "./monthlyMentors"
import UpccomingTask from "./upccomingTask"
import TaskToday, { MiniCalendar } from "./taskToday"

// Constants

const CHART = { w: 600, h: 120, padX: 20, padY: 16, max: 4 } as const
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"] as const
const DATA_POINTS = [0.4, 1.1, 0.3, 2.0, 0.2, 1.4, 0.1] as const
const DEFAULT_ACTIVE = 3

// Helpers 

function buildCurvePath(xs: number[], ys: number[]): string {
    if (xs.length < 2) return ""
    let d = `M ${xs[0]} ${ys[0]}`
    for (let i = 1; i < xs.length; i++) {
        const cpx = (xs[i - 1] + xs[i]) / 2
        d += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`
    }
    return d
}

function toY(value: number): number {
    const { h, padY, max } = CHART
    return h - padY - (value / max) * (h - padY * 2)
}

function toX(index: number, total: number): number {
    const { w, padX } = CHART
    return padX + (index * (w - padX * 2)) / (total - 1)
}

// SparkLine 

function SparkLine() {
    const svgRef = useRef<SVGSVGElement>(null)
    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE)
    const [isHovered, setIsHovered] = useState(false)

    const xs = DATA_POINTS.map((_, i) => toX(i, DATA_POINTS.length))
    const ys = DATA_POINTS.map((v) => toY(v))

    const curvePath = buildCurvePath(xs, ys)
    const firstX = xs[0]
    const lastX = xs[xs.length - 1]
    const areaPath = `${curvePath} L ${lastX} ${CHART.h} L ${firstX} ${CHART.h} Z`

    const activeIdx = isHovered ? activeIndex : DEFAULT_ACTIVE
    const dotX = xs[activeIdx]
    const dotY = ys[activeIdx]
    const taskCount = Math.round(DATA_POINTS[activeIdx])

    function getNearestIndex(clientX: number, svgRect: DOMRect): number {
        const svgX = ((clientX - svgRect.left) / svgRect.width) * CHART.w
        return xs.reduce(
            (nearest, x, i) =>
                Math.abs(svgX - x) < Math.abs(svgX - xs[nearest]) ? i : nearest,
            0
        )
    }

    function handleMouseMove(e: MouseEvent<SVGSVGElement>) {
        if (!svgRef.current) return
        setIsHovered(true)
        setActiveIndex(getNearestIndex(e.clientX, svgRef.current.getBoundingClientRect()))
    }

    function handleMouseLeave() {
        setIsHovered(false)
        setActiveIndex(DEFAULT_ACTIVE)
    }

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${CHART.w} ${CHART.h}`}
            className="w-full h-full cursor-default"
            preserveAspectRatio="none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <defs>
                <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A1A2E" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#1A1A2E" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Area fill */}
            <path d={areaPath} fill="url(#sparkline-gradient)" />

            {/* Curve line */}
            <path
                d={curvePath}
                fill="none"
                stroke="#1A1A2E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Active dot */}

            <circle cx={dotX} cy={dotY} r="10" fill="#546FFF" />
            <circle cx={dotX} cy={dotY} r="5" fill="#FFFFFF" />

            {/* Tooltip */}
            <rect
                x={dotX - 35}
                y={dotY - 58}
                width="70"
                height="38"
                rx="10"
                fill="#1A1A2E"
            />

            <polygon
                points={`${dotX - 6},${dotY - 20}
           ${dotX + 6},${dotY - 20}
           ${dotX},${dotY - 12}`}
                fill="#1A1A2E"
            />

            <text
                x={dotX}
                y={dotY - 35}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="600"
            >
                {taskCount} Task
            </text>
        </svg>
    )
}

// ActivityCard 

function ActivityCard() {
    return (
        <div
            className="rounded-2xl bg-[#F5F5F7] shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-2"
            style={{ height: 214 }}
        >
            <div className="flex items-center justify-between" style={{ flexShrink: 0 }}>
                <p className="text-sm font-semibold text-[#1A1A2E]">Activity</p>
                <span className="flex items-center gap-1 text-[12px] font-medium cursor-pointer px-3 py-1 rounded-lg select-none">
                    This Week
                    <ChevronDown className="w-3.5 h-3.5" />
                </span>
            </div>

            <div
                className="rounded-xl bg-white flex flex-col pt-3 pb-2 px-2"
                style={{ flex: 1, minHeight: 0, overflow: "hidden" }}
            >
                <div className="flex gap-1" style={{ flex: 1, minHeight: 0 }}>
                    <div
                        className="flex flex-col justify-between text-[9px] text-[#888] pr-1 py-0.5"
                        style={{ flexShrink: 0 }}
                    >
                        <span>3</span>
                        <span>2</span>
                        <span>1</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
                        <SparkLine />
                    </div>
                </div>

                <div
                    className="flex justify-between text-[9px] text-[#141522] pl-5 pr-1 mt-1"
                    style={{ flexShrink: 0 }}
                >
                    {DAY_LABELS.map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

// WelcomeBanner 

function WelcomeBanner() {
    return (
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6 py-5">
            <p className="text-[10px] text-[#9999A8] font-semibold uppercase tracking-widest mb-1">
                Welcome Back
            </p>
            <h2 className="text-xl font-bold text-[#1A1A2E]">Hi, Skylar Dias 👋</h2>
            <p className="text-xs text-[#9999A8] mt-0.5">Let's finish your task today!</p>
        </div>
    )
}

// Overview 

export default function Overview() {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* Left column */}
            <div className="flex-1 min-w-0 space-y-5">
                <WelcomeBanner />
                <ActivityCard />
                <MonthlyMentors />
                <UpccomingTask />
            </div>

            {/* Right sidebar */}
            <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-4 self-stretch lg:h-[1000px]">
                <MiniCalendar />
                <TaskToday />
            </div>
        </div>
    )
}