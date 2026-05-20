import { useState, useRef, MouseEvent } from "react"
import { TrendingUp } from "lucide-react"
import MonthlyMentors from "./monthlyMentors"
import UpccomingTask from "./upccomingTask"
import TaskToday, { MiniCalendar } from "./taskToday"

const initialPoints = [1.2, 2.4, 1.8, 3.2, 2.0, 2.8, 1.5]
const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]

function SparkLine() {
    const w = 260
    const h = 90
    const pad = 10

    const svgRef = useRef<SVGSVGElement>(null)

    const [points, setPoints] = useState<number[]>(initialPoints)
    const [activeIndex, setActiveIndex] = useState<number>(1)
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const currentPoints = isHovered ? points : initialPoints
    const currentActiveIndex = isHovered ? activeIndex : 1

    const xs = currentPoints.map(
        (_, i) => pad + (i * (w - pad * 2)) / (currentPoints.length - 1)
    )
    const max = 4.0
    const ys = currentPoints.map((v) => h - pad - (v / max) * (h - pad * 2))
    const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ")
    const area = `${d} L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`

    const handleSvgInteraction = (e: MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current) return
        setIsHovered(true)

        const rect = svgRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top

        const svgX = (clickX / rect.width) * w
        const svgY = (clickY / rect.height) * h

        let closestIndex = 0
        let minDiff = Math.abs(svgX - xs[0])

        xs.forEach((xCoord, index) => {
            const diff = Math.abs(svgX - xCoord)
            if (diff < minDiff) {
                minDiff = diff
                closestIndex = index
            }
        })

        if (e.type === "click") {
            const calculatedValue = ((h - pad - svgY) / (h - pad * 2)) * max
            const boundedValue = Math.max(0.2, Math.min(max - 0.2, calculatedValue))

            const updatedPoints = [...points]
            updatedPoints[closestIndex] = Number(boundedValue.toFixed(2))
            setPoints(updatedPoints)
        }

        setActiveIndex(closestIndex)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setPoints(initialPoints)
    }

    const activeX = xs[currentActiveIndex]
    const activeY = ys[currentActiveIndex]
    const activeTasks = Math.round(currentPoints[currentActiveIndex]) || 2

    const tooltipW = 54
    const tooltipH = 22
    const tooltipX = activeX - tooltipW / 2
    const tooltipY = activeY - tooltipH - 12

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${w} ${h}`}
            className="w-full cursor-pointer select-none"
            preserveAspectRatio="none"
            onClick={handleSvgInteraction}
            onMouseMove={handleSvgInteraction}
            onMouseLeave={handleMouseLeave}
        >
            <defs>
                {/* Slim line tracking gradient overlay (Black accents) */}
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A1A2E" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#1A1A2E" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Gradient Area Fill */}
            <path d={area} fill="url(#sg)" className="transition-all duration-300 ease-out" />

            {/* Main Slim Black Sparkline Path */}
            <path
                d={d}
                fill="none"
                stroke="#1A1A2E"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 ease-out"
            />

            {/* Active Core Nodes scaled down to match the slim black layout */}
            <circle cx={activeX} cy={activeY} r="7" fill="#1A1A2E" fillOpacity="0.1" className="transition-all duration-200 ease-out" />
            <circle cx={activeX} cy={activeY} r="3.5" fill="#1A1A2E" stroke="white" strokeWidth="1.5" className="transition-all duration-200 ease-out" />

            {/* Tooltip Wrapper */}
            <g className="transition-all duration-200 ease-out">
                <rect
                    x={tooltipX}
                    y={tooltipY}
                    width={tooltipW}
                    height={tooltipH}
                    rx="6"
                    fill="#1A1A2E"
                />
                <polygon
                    points={`
                        ${activeX - 5},${tooltipY + tooltipH}
                        ${activeX + 5},${tooltipY + tooltipH}
                        ${activeX},${tooltipY + tooltipH + 5}
                    `}
                    fill="#1A1A2E"
                />
                <text
                    x={activeX}
                    y={tooltipY + tooltipH / 2 + 3.5}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="white"
                    fontFamily="sans-serif"
                    fontWeight="600"
                >
                    {activeTasks} Task{activeTasks > 1 ? 's' : ''}
                </text>
            </g>
        </svg>
    )
}

export default function Overview() {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start">
            <div className="flex-1 min-w-0 space-y-5">
                <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6 py-5">
                    <p className="text-[10px] text-[#9999A8] font-semibold uppercase tracking-widest mb-1">Welcome Back</p>
                    <h2 className="text-xl font-bold text-[#1A1A2E]">Hi, Skylar Dias 👋</h2>
                    <p className="text-xs text-[#9999A8] mt-0.5">Let's finish your task today!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[194px_minmax(0,1fr)] gap-[18px]">
                    <div className="rounded-2xl bg-[#141522] text-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.10)]">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">Running Task</p>
                        <div className="flex items-center gap-4">
                            <div className="relative w-[62px] h-[62px] shrink-0">
                                <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
                                    <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
                                    <circle cx="36" cy="36" r="28" fill="none" stroke="#4F6EF7" strokeWidth="9"
                                        strokeDasharray={`${2 * Math.PI * 28 * 0.45} ${2 * Math.PI * 28 * 0.55}`}
                                        strokeLinecap="round" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">45%</span>
                            </div>
                            <div>
                                <p className="text-3xl font-extrabold leading-none">65</p>
                                <p className="text-xs text-white/40 mt-1">of <span className="text-white font-semibold">100</span> Task</p>
                                <div className="mt-2 flex items-center gap-1 text-[#4F6EF7] text-[11px] font-medium">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>+12% this week</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[#F5F5F7] shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-[#1A1A2E]">Activity</p>
                            <span className="text-[11px] text-[#4F6EF7] font-medium cursor-pointer bg-[#F0F2FF] px-2.5 py-1 rounded-lg select-none">
                                This Week ▾
                            </span>
                        </div>
                        <div className="bg-white rounded-xl flex gap-1 pt-3 pb-1.5 px-2">
                            <div className="flex flex-col justify-between text-[9px] text-[#C5C5D0] h-[90px] pr-1 shrink-0 py-0.5">
                                <span>3</span><span>2</span><span>1</span>
                            </div>
                            <div className="flex-1">
                                <SparkLine />
                            </div>
                        </div>
                        <div className="flex justify-between text-[9px] text-[#C5C5D0] pl-5 pr-1">
                            {dayLabels.map((d, i) => <span key={i}>{d}</span>)}
                        </div>
                    </div>
                </div>

                <MonthlyMentors />
                <UpccomingTask />
            </div>

            <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 space-y-4">
                <MiniCalendar />
                <TaskToday />
            </div>
        </div>
    )
}